---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Configuration"
sidebar_position: 1
---

# Configuration

Settings are read from the environment and, for what is missing, from `~/.config/reddit-mcp/credentials.env`.

| Setting | Default | Meaning |
| --- | --- | --- |
| `REDDIT_CLIENT_ID` | required | The id of your approved app |
| `REDDIT_CLIENT_SECRET` | required | Its secret. Keep it in the private file only |
| `REDDIT_USER_AGENT` | required | Reddit wants a unique, descriptive one: `platform:app:version (by /u/name)` |
| `REDDIT_RATE_PER_MIN` | `50` | Our own ceiling, from 1 to 90. Reddit's free limit is 100 per minute |
| `REDDIT_CACHE_MINUTES` | `10` | How long an answer is remembered in memory, 0 to 60. `0` turns the cache off |
| `REDDIT_MAX_REQUESTS` | `100` | Hard cap of requests to Reddit for one run of the server, 1 to 1000 |
| `REDDIT_ALLOW_NSFW` | `false` | `true` shows adult-marked posts |
| `REDDIT_ALLOWED_SUBREDDITS` | empty | Optional, comma separated. When set, only these communities can be searched or read, and a search over all of Reddit is refused |

A value outside its range is ignored and the default is used.

## How the limits behave

- **Per minute:** a sliding window. When it is full the server waits instead of failing. On a `429` it waits for the time Reddit asks (at most two minutes) and retries.
- **Per session:** one run of the server is one session. When `REDDIT_MAX_REQUESTS` is reached every further call fails with a clear message until the server is started again. The token request counts too.
- **Cache:** the same question, with the same arguments, costs one request in ten minutes.
