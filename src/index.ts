#!/usr/bin/env bun
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import pkg from '../package.json'
import { loadConfig } from './config'
import { makeReddit, RedditError } from './reddit/client'
import { makeTools } from './tools'

let cfg: ReturnType<typeof loadConfig>
try { cfg = loadConfig() } catch (e) { console.error(`reddit-mcp: ${(e as Error).message}`); process.exit(1) }
const tools = makeTools(makeReddit(cfg), cfg)
const server = new McpServer({ name: 'reddit-mcp', version: pkg.version })

for (const t of tools) {
  server.registerTool(t.name, { title: t.title, description: t.description, inputSchema: t.inputSchema, annotations: { readOnlyHint: true, openWorldHint: true } }, async (args: any) => {
    try {
      return { content: [{ type: 'text' as const, text: await t.run(args) }] }
    } catch (e) {
      const msg = e instanceof RedditError ? e.message : 'Something went wrong while asking Reddit.'
      return { isError: true, content: [{ type: 'text' as const, text: msg }] }
    }
  })
}

await server.connect(new StdioServerTransport())
