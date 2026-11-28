---
title: Development
sidebar_position: 2
---

# Development

```bash
bun install
bun run check        # types, lint, tests, and the tools reference is up to date
bun run gen:docs     # rewrite the tools reference (English and Italian) from src/tools/
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

A new tool is a new file in `src/tools/`, added to the list in `src/tools/index.ts`; `bun run gen:docs` then writes its page.

- The unit tests use a fake `fetch`. The end-to-end test starts the **real server process** over stdio with a fake Reddit preloaded (`test/fake-reddit.ts`), so nothing ever reaches the network.
- CI runs on a private Gitea (`.gitea/workflows/ci.yml`); GitHub ignores that folder.
- Pages exist in English and Italian side by side under `docs/i18n/<language>/docusaurus-plugin-content-docs/current/`. There is no `docs/docs` folder.
