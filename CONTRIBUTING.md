# Contributing

Thanks for looking. This is a small, deliberately narrow tool: **read-only** access to Reddit's official Data API. Changes that add any way to post, vote, comment or message, to scrape, or to store Reddit content will not be accepted.

```sh
bun install
bun run check        # types, lint, tests, tools reference up to date
bun run docs:build   # the documentation site (English and Italian)
```

- Tests never touch the network: unit tests use a fake `fetch`, the end-to-end test starts the real server with a fake Reddit (`test/fake-reddit.ts`).
- After changing a tool or an argument, run `bun run gen:docs` and commit the result.
- Documentation exists in English and Italian side by side under `docs/i18n/`; change both.
- Security problems: open a private security advisory, see [SECURITY.md](SECURITY.md).
