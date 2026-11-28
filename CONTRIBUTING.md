# Contributing

Thanks for looking. This is a small, deliberately narrow tool: **read-only** access to Reddit's official Data API. Changes that add any way to post, vote, comment or message, to scrape, or to store Reddit content will not be accepted.

```sh
bun install
bun run check        # types, lint, tests, tools reference and generated site up to date
bun run docs:build   # the documentation site (English and Italian)
```

- Tests never touch the network: unit tests use a fake `fetch`, the end-to-end test starts the real server with a fake Reddit (`test/fake-reddit.ts`).
- After changing a tool or an argument, run `bun run gen:docs` and `bun run docs:sync`, and commit the result.
- Write documentation in `docs/content/<language>/`, in English and Italian side by side; change both. Then run `bun run docs:sync`: [Notarius](https://github.com/nicholas1990/notarius) turns those pages into the Docusaurus site under `docs/i18n/` (do not edit those by hand).
- Security problems: open a private security advisory, see [SECURITY.md](SECURITY.md).
