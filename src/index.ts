#!/usr/bin/env bun
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import pkg from '../package.json'
import { loadConfig } from './config'
import { makeReddit } from './reddit/client'
import { createServer } from './server'
import { makeTools } from './tools'

let cfg: ReturnType<typeof loadConfig>
try { cfg = loadConfig() } catch (e) { console.error(`reddit-mcp: ${(e as Error).message}`); process.exit(1) }

await createServer(makeTools(makeReddit(cfg), cfg), pkg.version).connect(new StdioServerTransport())
