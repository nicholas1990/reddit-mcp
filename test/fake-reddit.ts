/**
 * Preloaded into the real server process by the end-to-end test (`bun --preload`): it replaces the network with a fake Reddit,
 * so the whole server (config, MCP, tools, client, formatting) runs for real and nothing leaves the machine.
 * It records every request in the file named by FAKE_REDDIT_LOG, so the test can check what was really sent.
 */
import { appendFileSync } from 'node:fs'

const post = (id: string, title: string, o: Record<string, unknown> = {}) => ({ kind: 't3', data: { id, title, author: 'ann', subreddit: 'socialmedia', score: 42, upvote_ratio: 0.9, num_comments: 2, created_utc: 1_700_000_000, permalink: `/r/socialmedia/comments/${id}/x/`, selftext: `body of ${title}`, is_self: true, over_18: false, ...o } })
const comment = (body: string, replies: unknown = '') => ({ kind: 't1', data: { author: 'bob', body, score: 3, created_utc: 1_700_000_100, replies } })

globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
  const url = String(input)
  appendFileSync(process.env.FAKE_REDDIT_LOG ?? '/dev/null', `${init?.method ?? 'GET'} ${url}\n`)
  if (url.includes('/api/v1/access_token')) return Response.json({ access_token: 'tok', expires_in: 3600 })
  if (url.includes('/comments/abc12')) {
    return Response.json([
      { data: { children: [post('abc12', 'Photo apps feel pushy')] } },
      { data: { children: [comment('agreed', { data: { children: [comment('same here')] } }), comment('[deleted]')] } },
    ])
  }
  if (url.includes('/comments/gone1')) return new Response('', { status: 404 })
  if (url.includes('/search') || url.includes('/top') || url.includes('/hot')) {
    return Response.json({ data: { children: [post('abc12', 'Photo apps feel pushy'), post('nsfw1', 'adult thing', { over_18: true }), post('rm001', 'removed thing', { removed_by_category: 'moderator' })], after: null } })
  }
  return new Response('', { status: 500 })
}) as typeof fetch
