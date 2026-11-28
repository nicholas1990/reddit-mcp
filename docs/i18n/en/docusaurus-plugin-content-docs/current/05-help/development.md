---
title: Development
sidebar_position: 2
---

# Development

```bash
bun install
bun run check        # types, lint, tests, and the tools reference is up to date
bun run gen:docs     # rewrite the tools reference (English and Italian) from src/tools.ts
bun run docs:build   # build this site (fails on a broken link)
```

- The unit tests use a fake `fetch`. The end-to-end test starts the **real server process** over stdio with a fake Reddit preloaded (`test/fake-reddit.ts`), so nothing ever reaches the network.
- CI runs on a private Gitea (`.gitea/workflows/ci.yml`); GitHub ignores that folder.
- Pages exist in English and Italian side by side under `docs/i18n/<language>/docusaurus-plugin-content-docs/current/`. There is no `docs/docs` folder.
