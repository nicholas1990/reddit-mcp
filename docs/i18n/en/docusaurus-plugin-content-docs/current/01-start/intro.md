---
title: Introduction
slug: /
sidebar_position: 1
---

# reddit-mcp

**reddit-mcp** lets an AI assistant search and read Reddit through the **official Data API**, for personal, non-commercial research: how people talk about an app, what they miss in a product, which trends are rising. It speaks the [Model Context Protocol](https://modelcontextprotocol.io) (MCP), so it works with any MCP client.

## What makes it different

- **Read-only by construction.** The client has one way out, a `GET`. There is no code path that posts, votes, comments or sends a message, and a test checks it.
- **A good citizen of the API.** App-only OAuth, a descriptive `User-Agent`, a sliding-window limit below Reddit's own, `Retry-After` obeyed, answers cached in memory, and a hard cap of requests per session.
- **Nothing is stored.** No database, no archive, no dataset, no model training. See [Data handling](../04-reddit/data-handling.md).
- **Built for untrusted text.** Everything on Reddit is written by strangers. Every answer starts with a notice that it is data and not instructions, long texts are cut, removed and adult content is left out, and each result carries its link so the assistant can cite it.
- **Generic, with a way to narrow it.** By default any public community can be read. An optional allow-list confines it to a few.

## What you need

- [Bun](https://bun.sh) to run the server.
- A Reddit Data API app. Since November 2025 Reddit approves them one by one: see [Getting access](../04-reddit/access.md), which also contains the request that was written for this tool.

Next: [Getting started](getting-started.md).
