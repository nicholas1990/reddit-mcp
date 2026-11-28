import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { RedditError } from './reddit/errors'
import type { Tool } from './tools'

type Result = { content: { type: 'text'; text: string }[]; isError?: boolean }

/**
 * What the assistant is told when a tool fails. Only messages written for it (RedditError) and bad arguments are shown as they are;
 * anything else is reported as a generic failure and written to stderr, so a bug is never silent and never leaks internals to the assistant.
 */
export function failureText(e: unknown, log: (line: string) => void = console.error): string {
  if (e instanceof RedditError) return e.message
  if (e instanceof z.ZodError) return `Invalid arguments: ${e.issues.map((i) => `${i.path.join('.') || 'input'}: ${i.message}`).join('; ')}.`
  log(`reddit-mcp: unexpected error: ${e instanceof Error ? (e.stack ?? e.message) : String(e)}`)
  return 'Something went wrong while asking Reddit.'
}

export async function runTool(tool: Tool, args: unknown, log?: (line: string) => void): Promise<Result> {
  try {
    return { content: [{ type: 'text', text: await tool.run(args) }] }
  } catch (e) {
    return { isError: true, content: [{ type: 'text', text: failureText(e, log) }] }
  }
}

/** The MCP server with the given tools, every one marked read-only. */
export function createServer(tools: Tool[], version: string): McpServer {
  const server = new McpServer({ name: 'reddit-mcp', version })
  for (const t of tools) {
    server.registerTool(
      t.name,
      { title: t.title, description: t.description, inputSchema: t.inputSchema, annotations: { readOnlyHint: true, openWorldHint: true } },
      (args: unknown) => runTool(t, args),
    )
  }
  return server
}
