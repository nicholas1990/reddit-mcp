import { afterAll, beforeAll, expect, test } from 'bun:test'
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { startServer } from './mcp-client'

// The real server process, speaking MCP over stdio, with a fake Reddit in place of the network (see fake-reddit.ts).
const dir = mkdtempSync(join(tmpdir(), 'reddit-mcp-e2e-'))
const log = join(dir, 'requests.log')
const env = { REDDIT_CLIENT_ID: 'id', REDDIT_CLIENT_SECRET: 'secret', REDDIT_USER_AGENT: 'linux:test:0 (by /u/x)', HOME: dir, FAKE_REDDIT_LOG: log }
const requests = () => readFileSync(log, 'utf8').trim().split('\n').filter(Boolean)
let server: ReturnType<typeof startServer>
beforeAll(() => { writeFileSync(log, ''); server = startServer(env) })
afterAll(() => server.stop())

test('lists exactly three tools, all marked read-only', async () => {
  const tools = await server.tools()
  expect(tools.map((t) => t.name).sort()).toEqual(['reddit_get_post', 'reddit_search', 'reddit_subreddit_posts'])
  for (const t of tools) expect(t.annotations?.readOnlyHint).toBe(true)
})

test('search works end to end: untrusted notice, permalink, adult and removed posts left out', async () => {
  const r = await server.tool('reddit_search', { query: 'photo apps', subreddit: 'socialmedia' })
  expect(r.error).toBe(false)
  expect(r.text.startsWith('UNTRUSTED CONTENT')).toBe(true)
  expect(r.text).toContain('Photo apps feel pushy'); expect(r.text).toContain('https://www.reddit.com/r/socialmedia/comments/abc12/x/')
  expect(r.text).not.toContain('adult thing'); expect(r.text).not.toContain('removed thing'); expect(r.text).toContain('2 hidden')
})

test('a community listing and a post with its comments', async () => {
  const list = await server.tool('reddit_subreddit_posts', { subreddit: 'socialmedia', listing: 'top' })
  expect(list.text).toContain('Photo apps feel pushy')
  const post = await server.tool('reddit_get_post', { post: 'https://www.reddit.com/r/socialmedia/comments/abc12/x/' })
  expect(post.text).toContain('- u/bob (3, 2023-11-14): agreed'); expect(post.text).toContain('  - u/bob (3, 2023-11-14): same here'); expect(post.text).not.toContain('[deleted]')
})

test('bad input and Reddit errors come back as short tool errors, not crashes', async () => {
  expect((await server.tool('reddit_get_post', { post: 'https://evil.example/comments/abc12/' })).error).toBe(true)
  expect((await server.tool('reddit_subreddit_posts', { subreddit: '../etc', listing: 'top' })).error).toBe(true)
  const missing = await server.tool('reddit_get_post', { post: 'gone1' })
  expect(missing.error).toBe(true); expect(missing.text).toContain('Not found')
  expect((await server.tool('reddit_search', { query: 'photo apps' })).error).toBe(false)   // the server is still alive
})

test('the only requests that ever left are one token request and GETs to oauth.reddit.com', () => {
  const lines = requests()
  const posts = lines.filter((l) => l.startsWith('POST'))
  expect(posts.length).toBe(1); expect(posts[0]).toContain('/api/v1/access_token')
  for (const l of lines.filter((x) => !x.startsWith('POST'))) { expect(l.startsWith('GET https://oauth.reddit.com/')).toBe(true) }
  expect(lines.some((l) => /DELETE|PUT|PATCH/.test(l.split(' ')[0]))).toBe(false)
})

test('refuses to start with a credentials file other people can read, and without credentials', async () => {
  const home = mkdtempSync(join(tmpdir(), 'reddit-mcp-home-'))
  const cfgDir = join(home, '.config', 'reddit-mcp'); await Bun.$`mkdir -p ${cfgDir}`
  const file = join(cfgDir, 'credentials.env')
  writeFileSync(file, 'REDDIT_CLIENT_ID=a\nREDDIT_CLIENT_SECRET=b\nREDDIT_USER_AGENT=c\n'); chmodSync(file, 0o644)
  const open = Bun.spawnSync(['bun', join(import.meta.dir, '../src/index.ts')], { env: { PATH: process.env.PATH ?? '', HOME: home }, stdin: 'ignore' })
  expect(open.exitCode).toBe(1); expect(open.stderr.toString()).toContain('must be private')
  const none = Bun.spawnSync(['bun', join(import.meta.dir, '../src/index.ts')], { env: { PATH: process.env.PATH ?? '', HOME: mkdtempSync(join(tmpdir(), 'reddit-mcp-empty-')) }, stdin: 'ignore' })
  expect(none.exitCode).toBe(1); expect(none.stderr.toString()).toContain('Missing REDDIT_CLIENT_ID')
})
