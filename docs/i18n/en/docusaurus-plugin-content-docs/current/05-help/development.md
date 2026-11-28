---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Development"
sidebar_position: 2
---

# Development

```bash
bun install
bun run check        # types, lint, tests, and the tools reference is up to date
bun run gen:docs     # rewrite the tools reference (English and Italian) from src/tools/
bun run docs:sync    # turn the pages in docs/content/ into the Docusaurus site
bun run docs:build   # build this site (fails on a broken link)
```

## Where things are

```text
src/index.ts          starts the server: reads the settings and connects
src/server.ts         registers the tools (all read-only) and turns errors into short answers; unexpected ones go to stderr
src/config.ts         settings and the credentials file
src/reddit/           the Reddit client (read-only GET, rate limit, cache, one request for identical calls), its errors and the types of the data it reads
src/tools/            the three tools, one file each, plus guards.ts (checks), schemas.ts (arguments) and types.ts (defineTool: arguments typed from the schema)
src/format.ts         what the assistant receives: untrusted-content notice, cuts, removed posts left out
test/                 end-to-end test and its fakes
scripts/              gen-reference.ts writes the tools reference
```

A new tool is a new file in `src/tools/`, added to the list in `src/tools/index.ts`; `bun run gen:docs` then writes its page (and `bun run docs:sync` puts it in the site).

- The unit tests use a fake `fetch`. The end-to-end test starts the **real server process** over stdio with a fake Reddit preloaded (`test/fake-reddit.ts`), so nothing ever reaches the network.
- CI runs on a private Gitea (`.gitea/workflows/ci.yml`); GitHub ignores that folder.
- The pages are written once, in English and Italian side by side, under `docs/content/<language>/`, in the content model of [Notarius](https://github.com/nicholas1990/notarius). `bun run docs:sync` generates the Docusaurus files under `docs/i18n/` from them, and `bun run docs:check` fails if they are out of date: change the pages in `docs/content/`, never the generated ones.
