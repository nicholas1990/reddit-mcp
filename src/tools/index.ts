import type { Config } from '../config'
import type { Reddit } from '../reddit/client'
import { getPostTool } from './get-post'
import { searchTool } from './search'
import { subredditPostsTool } from './subreddit-posts'
import type { Tool } from './types'

export { allowed, postId } from './guards'
export type { Tool } from './types'

/** The three tools, all read-only. One file each; the shared pieces are in guards.ts (checks) and schemas.ts (arguments). */
export function makeTools(reddit: Reddit, cfg: Config): Tool[] {
  const ctx = { reddit, cfg }
  return [searchTool(ctx), subredditPostsTool(ctx), getPostTool(ctx)]
}
