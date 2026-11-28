import { z } from 'zod'
import type { Config } from '../config'
import type { Reddit } from '../reddit/client'

/** What every tool receives: the Reddit client and the settings. */
export type ToolContext = { reddit: Reddit; cfg: Config }

/** What the server sees of a tool. `run` takes the raw arguments: it validates them and fills in the defaults itself. */
export type Tool = { name: string; title: string; description: string; inputSchema: z.ZodRawShape; run: (args: unknown) => Promise<string> }

/**
 * The arguments of `run` are typed from the schema, so the two cannot drift apart, and the same validation happens
 * whether the call comes from an MCP client or from a test.
 */
export function defineTool<S extends z.ZodRawShape>(t: Omit<Tool, 'inputSchema' | 'run'> & { inputSchema: S; run: (args: z.infer<z.ZodObject<S>>) => Promise<string> }): Tool {
  const schema = z.object(t.inputSchema)
  return { ...t, run: async (args) => t.run(schema.parse(args ?? {})) }   // async: bad arguments are a rejected promise, never a throw before it
}
