import type { Config } from './config'

const OAUTH = 'https://oauth.reddit.com'
const TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'

export class RedditError extends Error {
  constructor(message: string, readonly status?: number) { super(message) }
}

type Deps = { fetch?: typeof fetch; now?: () => number; sleep?: (ms: number) => Promise<void> }

/**
 * A READ-ONLY client of Reddit's official Data API (application-only OAuth).
 * - It can only issue GET requests: there is no method that posts, votes, comments or changes anything.
 * - It keeps below `ratePerMinute` (a sliding window) and obeys Reddit's `Retry-After` on a 429.
 * - It caches answers for a few minutes, so the same question never costs a second request.
 */
export function makeReddit(cfg: Config, d: Deps = {}) {
  const doFetch = d.fetch ?? fetch
  const now = d.now ?? Date.now
  const sleep = d.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)))
  let token: { value: string; expires: number } | undefined
  const sent: number[] = []                       // times of the last requests (sliding minute)
  const cache = new Map<string, { at: number; body: unknown }>()

  async function throttle() {
    for (;;) {
      const t = now()
      while (sent.length && t - sent[0] >= 60_000) sent.shift()
      if (sent.length < cfg.ratePerMinute) { sent.push(t); return }
      await sleep(60_000 - (t - sent[0]) + 5)
    }
  }

  async function getToken(): Promise<string> {
    if (token && token.expires - 30_000 > now()) return token.value
    await throttle()
    const res = await doFetch(TOKEN_URL, {
      method: 'POST',
      headers: { Authorization: `Basic ${Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString('base64')}`, 'User-Agent': cfg.userAgent, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials',
    })
    if (!res.ok) throw new RedditError(`Reddit refused the credentials (HTTP ${res.status}). Check the app id and secret, and that the access was approved.`, res.status)
    const j = (await res.json()) as { access_token?: string; expires_in?: number; error?: string }
    if (!j.access_token) throw new RedditError(`Reddit gave no token${j.error ? `: ${j.error}` : ''}.`)
    token = { value: j.access_token, expires: now() + (j.expires_in ?? 3600) * 1000 }
    return token.value
  }

  /** GET <path>?<params>. The only way out of this module. */
  async function get(path: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<unknown> {
    if (!path.startsWith('/') || path.includes('..')) throw new RedditError('Invalid path.')
    const q = new URLSearchParams({ raw_json: '1' })
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') q.set(k, String(v))
    const url = `${OAUTH}${path}?${q}`
    const hit = cache.get(url)
    if (hit && cfg.cacheMinutes > 0 && now() - hit.at < cfg.cacheMinutes * 60_000) return hit.body

    for (let attempt = 0; attempt < 3; attempt++) {
      const bearer = await getToken()
      await throttle()
      const res = await doFetch(url, { method: 'GET', headers: { Authorization: `Bearer ${bearer}`, 'User-Agent': cfg.userAgent } })
      if (res.status === 401) { token = undefined; continue }
      if (res.status === 429) {
        const wait = Math.min(Math.max(Number(res.headers.get('retry-after')) || 10, 1), 120)
        await sleep(wait * 1000)
        continue
      }
      if (res.status === 403) throw new RedditError('Reddit says this is forbidden (a private or quarantined community, or the access does not cover it).', 403)
      if (res.status === 404) throw new RedditError('Not found (the post or community does not exist, or was removed).', 404)
      if (!res.ok) throw new RedditError(`Reddit answered HTTP ${res.status}.`, res.status)
      const body = await res.json()
      if (cfg.cacheMinutes > 0) cache.set(url, { at: now(), body })
      return body
    }
    throw new RedditError('Reddit is limiting requests right now: try again in a few minutes.', 429)
  }

  return { get, stats: () => ({ lastMinute: sent.length, cached: cache.size }) }
}
export type Reddit = ReturnType<typeof makeReddit>
