---
title: Per iniziare
sidebar_position: 2
---

# Per iniziare

1. **Installa.**

   ```bash
   git clone https://github.com/nicholas1990/reddit-mcp.git
   cd reddit-mcp
   bun install
   ```

2. **Metti le credenziali in un file privato**, fuori da ogni repository:

   ```bash
   mkdir -p ~/.config/reddit-mcp
   cp .env.example ~/.config/reddit-mcp/credentials.env
   chmod 600 ~/.config/reddit-mcp/credentials.env   # poi compila i tre valori
   ```

   Il server non parte se il file è leggibile da altri utenti. Le credenziali **non** fanno parte della configurazione MCP che dai all'assistente, quindi l'assistente non può leggerle.

3. **Controlla che tutto funzioni** (servono né rete né un account Reddit: i test usano un Reddit finto):

   ```bash
   bun run check
   ```

4. **Aggiungilo a un client MCP qualsiasi:**

   ```json
   { "mcpServers": { "reddit": { "command": "bun", "args": ["/percorso/di/reddit-mcp/src/index.ts"] } } }
   ```

Poi fai una domanda: *«Cosa non piace alle persone delle app per condividere foto? Cerca in alcune community e cita i link.»*

Poi: [Configurazione](../02-use/configuration.md).
