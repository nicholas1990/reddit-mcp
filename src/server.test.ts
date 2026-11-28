import { expect, test } from 'bun:test'
import { z } from 'zod'
import { RedditError } from './reddit/errors'
import { failureText, runTool } from './server'
import type { Tool } from './tools'

const tool = (run: () => Promise<string>): Tool => ({ name: 't', title: 't', description: 'd', inputSchema: {}, run })

test('an error written for the assistant is shown as it is', () => {
  expect(failureText(new RedditError('Not found (the post does not exist).', 404), () => { throw new Error('must not log') })).toContain('Not found')
})

test('bad arguments say which one is wrong', () => {
  const e = (() => { try { z.object({ query: z.string().min(2) }).parse({ query: 'x' }) } catch (err) { return err } })()
  expect(failureText(e)).toContain('Invalid arguments: query:')
})

test('anything unexpected is generic for the assistant and written to stderr for the owner, never silent', async () => {
  const lines: string[] = []
  const r = await runTool(tool(async () => { throw new Error('secret path /home/x/boom') }), {}, (l) => lines.push(l))
  expect(r.isError).toBe(true); expect(r.content[0].text).toBe('Something went wrong while asking Reddit.')
  expect(r.content[0].text).not.toContain('secret')
  expect(lines.length).toBe(1); expect(lines[0]).toContain('secret path')
})

test('a good answer is plain text and not an error', async () => {
  const r = await runTool(tool(async () => 'hello'), {})
  expect(r).toEqual({ content: [{ type: 'text', text: 'hello' }] })
})
