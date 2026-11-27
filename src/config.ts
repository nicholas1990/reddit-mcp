import { existsSync, readFileSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

/**
 * Where the credentials live: a file of the user, outside any repository, readable only by them (mode 600).
 * They are NEVER part of the MCP config that is handed to an assistant, so an assistant that uses this server cannot read them.
 */
export const CREDENTIALS_FILE = join(homedir(), '.config', 'reddit-mcp', 'credentials.env')

export type Config = {
  clientId: string
  clientSecret: string
  userAgent: string          // Reddit requires a unique, descriptive one: "platform:app:version (by /u/name)"
  ratePerMinute: number      // our own ceiling, always below Reddit's 100 per minute
  cacheMinutes: number
  allowNsfw: boolean
  allowedSubreddits: string[]   // when not empty, ONLY these communities can be searched or read (lowercase)
  maxRequests: number           // hard cap of Reddit requests for one run of the server
}

export function parseEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const i = line.indexOf('=')
    if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
  }
  return out
}

/** Reads the settings from the environment and, for what is missing, from the credentials file. */
export function loadConfig(env: Record<string, string | undefined> = process.env, file = CREDENTIALS_FILE): Config {
  let fromFile: Record<string, string> = {}
  if (existsSync(file)) {
    const mode = statSync(file).mode & 0o077
    if (mode !== 0) throw new Error(`${file} must be private (chmod 600): other users could read it.`)
    fromFile = parseEnv(readFileSync(file, 'utf8'))
  }
  const get = (k: string) => env[k] || fromFile[k] || ''
  const clientId = get('REDDIT_CLIENT_ID'), clientSecret = get('REDDIT_CLIENT_SECRET'), userAgent = get('REDDIT_USER_AGENT')
  const missing = [['REDDIT_CLIENT_ID', clientId], ['REDDIT_CLIENT_SECRET', clientSecret], ['REDDIT_USER_AGENT', userAgent]].filter(([, v]) => !v).map(([k]) => k)
  if (missing.length) throw new Error(`Missing ${missing.join(', ')}. Put them in ${file} (see .env.example).`)
  const num = (k: string, d: number, min: number, max: number) => { const n = Number(get(k)); return Number.isFinite(n) && n >= min && n <= max && get(k) !== '' ? n : d }
  return {
    clientId, clientSecret, userAgent,
    ratePerMinute: num('REDDIT_RATE_PER_MIN', 50, 1, 90),
    cacheMinutes: num('REDDIT_CACHE_MINUTES', 10, 0, 60),
    allowNsfw: get('REDDIT_ALLOW_NSFW') === 'true',
    allowedSubreddits: get('REDDIT_ALLOWED_SUBREDDITS').split(',').map((s) => s.trim().replace(/^r\//i, '').toLowerCase()).filter(Boolean),
    maxRequests: num('REDDIT_MAX_REQUESTS', 100, 1, 1000),
  }
}
