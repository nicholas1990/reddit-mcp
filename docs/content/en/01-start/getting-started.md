---
title: "Getting started"
order: 2
---

1. **Install.**

   ```bash
   git clone https://github.com/nicholas1990/reddit-mcp.git
   cd reddit-mcp
   bun install
   ```

2. **Put the credentials in a private file**, outside any repository:

   ```bash
   mkdir -p ~/.config/reddit-mcp
   cp .env.example ~/.config/reddit-mcp/credentials.env
   chmod 600 ~/.config/reddit-mcp/credentials.env   # then fill in the three values
   ```

   The server refuses to start if the file can be read by other users. The credentials are **not** part of the MCP configuration you give to the assistant, so the assistant cannot read them.

3. **Check that everything works** (no network and no Reddit account needed: the tests use a fake Reddit):

   ```bash
   bun run check
   ```

4. **Add it to any MCP client:**

   ```json
   { "mcpServers": { "reddit": { "command": "bun", "args": ["/path/to/reddit-mcp/src/index.ts"] } } }
   ```

Then ask a question: *"What do people dislike about photo-sharing apps? Search a few communities and cite the links."*

Next: [Configuration](../02-use/configuration.md).
