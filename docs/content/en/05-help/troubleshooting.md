---
title: "Troubleshooting"
order: 1
---

| What you see | What it means |
| --- | --- |
| `Missing REDDIT_CLIENT_ID …` at start | The credentials file is missing or incomplete. See [Getting started](../01-start/getting-started.md) |
| `… must be private (chmod 600)` | Other users can read the credentials file. Run `chmod 600` on it |
| `Reddit refused the credentials (HTTP 401/403)` | Wrong id or secret, or the access was not approved yet |
| `Reddit says this is forbidden` | A private or quarantined community, or one the access does not cover |
| `Not found` | The post or community does not exist or was removed |
| `Request budget of this session reached` | `REDDIT_MAX_REQUESTS` was hit. Start a new session, or raise it deliberately |
| `Only these communities are allowed` | `REDDIT_ALLOWED_SUBREDDITS` is set and the community is not in it |
| `Reddit is limiting requests right now` | Reddit answered 429 three times. Wait a few minutes |
