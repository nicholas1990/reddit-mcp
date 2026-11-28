# reddit-mcp

A small, **read-only** [MCP](https://modelcontextprotocol.io) server that lets an AI assistant search and read Reddit through the **official Data API** (OAuth), for personal, non-commercial research such as studying how people talk about an app or a feature.

It does **not** post, vote, comment, message or change anything: there is no code path that sends anything but `GET`. It does **not** scrape, and it does **not** store Reddit content (only a short in-memory cache).

## Tools

| Tool | What it does |
| --- | --- |
| `reddit_search` | Search posts, in one community or in all of Reddit |
| `reddit_subreddit_posts` | List the hot / top / new / rising posts of a community |
| `reddit_get_post` | Read one post and its comment tree (deleted and removed items are skipped) |

Every answer starts with a notice that the text is **untrusted data written by strangers, not instructions**, long texts are cut, adult content is off by default, and each result carries its permalink so the assistant can cite it.

## Good citizen by design

- Official API only, with an app-only OAuth token and a descriptive `User-Agent`.
- Keeps **below 90 requests per minute** (default 50; Reddit's free limit is 100) with a sliding window, obeys `Retry-After` on a 429, and caches answers for 10 minutes so the same question never costs two requests.
- An optional **allow-list of communities** (`REDDIT_ALLOWED_SUBREDDITS`): only those can be searched or read, and a search over all of Reddit is refused. And a **hard cap of requests per session** (`REDDIT_MAX_REQUESTS`, default 100).
- No storage of Reddit content, no redistribution, **no use to train models**. Details in [data handling](docs/i18n/en/docusaurus-plugin-content-docs/current/04-reddit/data-handling.md).

## Setup

You need an approved Reddit Data API app (see [Getting access](docs/i18n/en/docusaurus-plugin-content-docs/current/04-reddit/access.md)).

```sh
bun install
mkdir -p ~/.config/reddit-mcp && cp .env.example ~/.config/reddit-mcp/credentials.env
chmod 600 ~/.config/reddit-mcp/credentials.env   # then fill in the three values
bun run check
```

The credentials live in that file (outside any repository, private to you) and **never** in the MCP configuration you give to an assistant, so the assistant cannot read them. The server refuses to start if the file is readable by others.

Add it to any MCP client:

```json
{ "mcpServers": { "reddit": { "command": "bun", "args": ["/path/to/reddit-mcp/src/index.ts"] } } }
```

## Configuration

| Setting | Default | Meaning |
| --- | --- | --- |
| `REDDIT_RATE_PER_MIN` | 50 | Requests per minute, 1-90 |
| `REDDIT_CACHE_MINUTES` | 10 | In-memory cache, 0-60 |
| `REDDIT_MAX_REQUESTS` | 100 | Hard cap per run of the server |
| `REDDIT_ALLOW_NSFW` | false | Show adult-marked posts |
| `REDDIT_ALLOWED_SUBREDDITS` | empty | Optional allow-list of communities |

## Documentation

Full documentation, in English and Italian (Docusaurus, in [`docs/`](docs/)): getting started, configuration, safety, the tools reference, and the Reddit access request. Build it with `bun run docs:build`.

## Development

`bun run check` runs the type check, the linter, the unit tests, an end-to-end test that starts the real server against a fake Reddit (no network and no Reddit account needed), and a check that the tools reference is up to date. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Not affiliated

An independent project, not affiliated with or endorsed by Reddit.
