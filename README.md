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
- No storage of Reddit content, no redistribution, **no use to train models**. Details in [docs/data-handling.md](docs/data-handling.md).

## Setup

You need an approved Reddit Data API app (see [docs/reddit-approval.md](docs/reddit-approval.md)).

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

## Development

`bun run check` runs the type check, the linter and the tests (no network and no Reddit account needed: the tests use a fake Reddit).

## Not affiliated

An independent project, not affiliated with or endorsed by Reddit.
