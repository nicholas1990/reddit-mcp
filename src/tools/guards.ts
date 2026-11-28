import type { Config } from '../config'
import { RedditError } from '../reddit/errors'

const POST_ID = /^[a-z0-9]{5,8}$/

/** Accepts a post id ("1abc23") or a reddit.com link, and returns the id. Anything else is refused. */
export function postId(input: string): string {
  const s = input.trim()
  if (POST_ID.test(s)) return s
  try {
    const u = new URL(s)
    if (!/(^|\.)reddit\.com$/.test(u.hostname) && u.hostname !== 'redd.it') throw new Error()
    const m = /\/comments\/([a-z0-9]{5,8})(?:\/|$)/.exec(u.pathname) ?? (u.hostname === 'redd.it' ? /^\/([a-z0-9]{5,8})$/.exec(u.pathname) : null)
    if (m) return m[1]
  } catch { /* falls through */ }
  throw new RedditError('Give a post id (like 1abc23) or a reddit.com link to a post.')
}

/** With an allow-list, only those communities exist for the tool. */
export function allowed(cfg: Config, name: string | undefined): boolean {
  return cfg.allowedSubreddits.length === 0 || (name !== undefined && cfg.allowedSubreddits.includes(name.toLowerCase()))
}
export const notAllowed = (cfg: Config) => new RedditError(`Only these communities are allowed: ${cfg.allowedSubreddits.map((s) => `r/${s}`).join(', ')}.`)

/** The community a reddit.com link names (".../r/<name>/..."), if it names one. A bare post id cannot say. */
export function linkedSubreddit(post: string): string | undefined {
  return /\/r\/([A-Za-z0-9_]{2,21})\//.exec(post)?.[1]
}
