/**
 * Writes the tools reference, in English and Italian, from the tools themselves (src/tools.ts), so it cannot drift.
 * `--check` only compares. Descriptions stay in English in both languages: they are the text the assistant reads.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { z } from 'zod'
import type { Config } from '../src/config'
import { makeTools } from '../src/tools'

const cfg: Config = { clientId: '', clientSecret: '', userAgent: '', ratePerMinute: 50, cacheMinutes: 10, allowNsfw: false, allowedSubreddits: [], maxRequests: 100 }
const tools = makeTools({ get: async () => ({}), stats: () => ({ lastMinute: 0, cached: 0, used: 0 }) }, cfg)

type Words = { title: string; intro: string; note?: string; head: string[]; yes: string; defaultWord: string }
const EN: Words = {
  title: 'Tools',
  intro: `Three tools, all read-only (each is marked \`readOnlyHint\`). None of them can post, vote, comment or message: the client has no way to send anything but a \`GET\`. Every answer starts with a notice that the text is untrusted data written by strangers.`,
  head: ['Argument', 'Type', 'Required', 'Default', 'Description'], yes: 'yes', defaultWord: 'default',
}
const IT: Words = {
  title: 'Strumenti',
  intro: 'Tre strumenti, tutti di sola lettura (ognuno è marcato `readOnlyHint`). Nessuno può pubblicare, votare, commentare o scrivere messaggi: il client non sa inviare altro che un `GET`. Ogni risposta inizia con un avviso: il testo è un dato non fidato, scritto da sconosciuti.',
  note: 'Le descrizioni degli strumenti e degli argomenti restano in inglese: sono il testo che legge l\'assistente.',
  head: ['Argomento', 'Tipo', 'Obbligatorio', 'Predefinito', 'Descrizione'], yes: 'sì', defaultWord: 'predefinito',
}

const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ')
function type(p: Record<string, any>): string {
  if (p.enum) return p.enum.map((v: string) => `\`${v}\``).join(' · ')
  const range = [p.minimum !== undefined ? `≥ ${p.minimum}` : '', p.maximum !== undefined ? `≤ ${p.maximum}` : ''].filter(Boolean).join(', ')
  return `${p.type}${range ? ` (${range})` : ''}`
}
function page(w: Words): string {
  const lines = ['---', `title: ${w.title}`, 'sidebar_position: 1', '---', '', `# ${w.title}`, '', '<!-- Generated from src/tools.ts by `bun run gen:docs`. Do not edit by hand. -->', '', w.intro, '', ...(w.note ? [w.note, ''] : [])]
  for (const t of tools) {
    const schema = z.toJSONSchema(z.object(t.inputSchema), { io: 'input' }) as { properties: Record<string, any>; required?: string[] }
    lines.push(`## \`${t.name}\``, '', t.description, '', `| ${w.head.join(' | ')} |`, '| --- | --- | :---: | --- | --- |')
    for (const [k, p] of Object.entries(schema.properties)) {
      lines.push(`| \`${k}\` | ${type(p)} | ${schema.required?.includes(k) ? w.yes : ''} | ${p.default !== undefined ? `\`${p.default}\`` : ''} | ${esc(p.description ?? '')} |`)
    }
    lines.push('')
  }
  return `${lines.join('\n').trimEnd()}\n`
}

const base = (l: string) => new URL(`../docs/i18n/${l}/docusaurus-plugin-content-docs/current/03-reference/tools.md`, import.meta.url).pathname
const outputs: [string, string][] = [[base('en'), page(EN)], [base('it'), page(IT)]]
if (process.argv.includes('--check')) {
  const stale = outputs.filter(([f, text]) => (existsSync(f) ? readFileSync(f, 'utf8') : '') !== text).map(([f]) => f)
  if (stale.length) { console.error(`Out of date: ${stale.join(', ')}. Run \`bun run gen:docs\`.`); process.exit(1) }
} else for (const [f, text] of outputs) writeFileSync(f, text)
