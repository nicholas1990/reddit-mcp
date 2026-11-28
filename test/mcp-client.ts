import { type ChildProcessWithoutNullStreams, spawn } from 'node:child_process'

/** A tiny MCP client over stdio, to test the real server process end to end. */
export function startServer(env: Record<string, string>) {
  const p: ChildProcessWithoutNullStreams = spawn('bun', ['--preload', new URL('./fake-reddit.ts', import.meta.url).pathname, new URL('../src/index.ts', import.meta.url).pathname], { env: { ...process.env, ...env } })
  let buf = ''
  const waiting = new Map<number, { ok: (m: any) => void; fail: (e: Error) => void }>()
  let stderr = ''
  p.stderr.on('data', (d) => (stderr += d))
  p.on('close', (code) => { for (const w of waiting.values()) w.fail(new Error(`server exited (${code}): ${stderr.trim()}`)); waiting.clear() })
  p.stdout.on('data', (d) => {
    buf += d
    for (let i = buf.indexOf('\n'); i >= 0; i = buf.indexOf('\n')) {
      const line = buf.slice(0, i); buf = buf.slice(i + 1)
      try { const m = JSON.parse(line); waiting.get(m.id)?.ok(m); waiting.delete(m.id) } catch { /* not a message */ }
    }
  })
  let id = 0
  const call = (method: string, params: unknown = {}) => new Promise<any>((resolve, reject) => {
    const n = ++id; const t = setTimeout(() => reject(new Error(`no answer to ${method}`)), 20_000)
    waiting.set(n, { ok: (m) => { clearTimeout(t); resolve(m) }, fail: (e) => { clearTimeout(t); reject(e) } })
    p.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id: n, method, params })}\n`)
  })
  const ready = call('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '0' } }).then(() => p.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' })}\n`))
  return {
    async tools() { await ready; return ((await call('tools/list')).result.tools as { name: string; annotations?: Record<string, unknown> }[]) },
    async tool(name: string, args: Record<string, unknown> = {}) { await ready; const r = (await call('tools/call', { name, arguments: args })).result; return { error: Boolean(r.isError), text: r.content[0].text as string } },
    stop() { p.kill() },
  }
}
