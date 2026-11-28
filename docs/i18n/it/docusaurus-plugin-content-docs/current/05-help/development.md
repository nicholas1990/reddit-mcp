---
title: Sviluppo
sidebar_position: 2
---

# Sviluppo

```bash
bun install
bun run check        # tipi, lint, test, e riferimento degli strumenti aggiornato
bun run gen:docs     # riscrive il riferimento degli strumenti (inglese e italiano) da src/tools.ts
bun run docs:build   # costruisce questo sito (fallisce se un link è rotto)
```

- I test unitari usano un `fetch` finto. Il test end-to-end avvia il **processo vero del server** su stdio con un Reddit finto precaricato (`test/fake-reddit.ts`), quindi niente arriva mai in rete.
- La CI gira su un Gitea privato (`.gitea/workflows/ci.yml`); GitHub ignora quella cartella.
- Le pagine esistono in inglese e italiano affiancate in `docs/i18n/<lingua>/docusaurus-plugin-content-docs/current/`. Non c'è una cartella `docs/docs`.
