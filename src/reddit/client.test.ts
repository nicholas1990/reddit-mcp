import { expect, test } from 'bun:test'
import { chmodSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { type Config, loadConfig } from '../config'
import { makeReddit } from './client'

const cfg: Config = { clientId: 'id', clientSecret: 'secret', userAgent: 'linux:test:0 (by /u/x)', ratePerMinute: 3, cacheMinutes: 10, allowNsfw: false, allowedSubreddits: [], maxRequests: 100 }
type Call = { url: string; method: string; headers: Record<string, string> }

function setup(handler: (url: string, n: number) => Response, c: Config = cfg) {
  const calls: Call[] = []; let t = 1_000_000; const slept: number[] = []
  const fetchFake = (async (url: string, init: RequestInit) => { calls.push({ url, method: String(init.method), headers: init.headers as Record<string, string> }); return handler(url, calls.length) }) as unknown as typeof fetch
  const reddit = makeReddit(c, { fetch: fetchFake, now: () => t, sleep: async (ms) => { slept.push(ms); t += ms } })
  return { reddit, calls, slept, tick: (ms: number) => { t += ms } }
}
const token = () => Response.json({ access_token: 'tok', expires_in: 3600 })
const ok = (body: unknown = { data: { children: [] } }) => Response.json(body)

test('gets a token with the credentials, then only sends GET with the token and the user agent', async () => {
  const s = setup((u) => (u.includes('access_token') ? token() : ok()))
  await s.reddit.get('/search', { q: 'hello' })
  expect(s.calls[0].url).toContain('/api/v1/access_token'); expect(s.calls[0].headers.Authorization).toBe(`Basic ${Buffer.from('id:secret').toString('base64')}`)
  expect(s.calls[1].method).toBe('GET'); expect(s.calls[1].headers.Authorization).toBe('Bearer tok'); expect(s.calls[1].headers['User-Agent']).toBe(cfg.userAgent)
  expect(s.calls[1].url).toContain('oauth.reddit.com/search?raw_json=1&q=hello')
  expect(s.calls.filter((c) => c.method !== 'GET' && !c.url.includes('access_token'))).toEqual([])   // never a write
})

test('the same question does not cost a second request (cache), and the token is reused', async () => {
  const s = setup((u) => (u.includes('access_token') ? token() : ok()))
  await s.reddit.get('/search', { q: 'a' }); await s.reddit.get('/search', { q: 'a' }); await s.reddit.get('/search', { q: 'b' })
  expect(s.calls.length).toBe(3)   // token + a + b
})

test('does not exceed its per-minute limit: it waits', async () => {
  const s = setup((u) => (u.includes('access_token') ? token() : ok()))   // limit 3: token + 2 requests, the third waits
  for (const q of ['1', '2', '3']) await s.reddit.get('/search', { q })
  expect(s.slept.length).toBeGreaterThan(0)
  expect(s.slept[0]).toBeGreaterThan(50_000)
})

test('a 429 honours Retry-After and retries; a 401 renews the token', async () => {
  let n = 0
  const s = setup((u) => { if (u.includes('access_token')) return token(); n++; return n === 1 ? new Response('', { status: 429, headers: { 'retry-after': '7' } }) : n === 2 ? new Response('', { status: 401 }) : ok({ ok: true }) }, { ...cfg, ratePerMinute: 90 })
  expect(await s.reddit.get('/x')).toEqual({ ok: true })
  expect(s.slept).toContain(7000)
  expect(s.calls.filter((c) => c.url.includes('access_token')).length).toBe(2)
})

test('clear errors: rejected credentials, 404, 403; odd paths are refused', async () => {
  const bad = setup(() => new Response('', { status: 401 }))
  await expect(bad.reddit.get('/x')).rejects.toThrow('refused the credentials')
  const nf = setup((u) => (u.includes('access_token') ? token() : new Response('', { status: 404 })))
  await expect(nf.reddit.get('/x')).rejects.toThrow('Not found')
  await expect(nf.reddit.get('/a/../b')).rejects.toThrow('Invalid path')
  await expect(nf.reddit.get('evil')).rejects.toThrow('Invalid path')
})

test('credentials: missing ones give an error naming what is missing; the file must be private', () => {
  expect(() => loadConfig({}, '/nonexistent')).toThrow('REDDIT_CLIENT_ID')
  const dir = mkdtempSync(join(tmpdir(), 'rmcp-')); const f = join(dir, 'c.env')
  writeFileSync(f, 'REDDIT_CLIENT_ID=a\nREDDIT_CLIENT_SECRET="b"\nREDDIT_USER_AGENT=linux:x:1 (by /u/y)\nREDDIT_RATE_PER_MIN=500\n')
  chmodSync(f, 0o644); expect(() => loadConfig({}, f)).toThrow('chmod 600')
  chmodSync(f, 0o600); const c = loadConfig({}, f)
  expect(c).toMatchObject({ clientId: 'a', clientSecret: 'b', ratePerMinute: 50, cacheMinutes: 10, allowNsfw: false })   // 500 is out of range: the safe default stays
})

test('per-session request cap: past it, nothing more is sent to Reddit', async () => {
  const s = setup((u) => (u.includes('access_token') ? token() : ok()), { ...cfg, ratePerMinute: 90, maxRequests: 3, cacheMinutes: 0 })
  await s.reddit.get('/a'); await s.reddit.get('/b')   // token + 2 = 3
  await expect(s.reddit.get('/c')).rejects.toThrow('budget')
  expect(s.calls.length).toBe(3)
})
