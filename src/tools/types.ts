import type { z } from 'zod'
import type { Config } from '../config'
import type { Reddit } from '../reddit/client'

export type Tool = { name: string; title: string; description: string; inputSchema: z.ZodRawShape; run: (args: any) => Promise<string> }

/** What every tool receives: the Reddit client and the settings. */
export type ToolContext = { reddit: Reddit; cfg: Config }
