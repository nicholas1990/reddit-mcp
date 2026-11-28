---
title: Sviluppo
sidebar_position: 2
---

# Sviluppo

```bash
bun install
bun run check        # tipi, lint, test, e riferimento degli strumenti aggiornato
bun run gen:docs     # riscrive il riferimento degli strumenti (inglese e italiano) da src/tools/
bun run docs:build   # costruisce questo sito (fallisce se un link è rotto)
```

## Dove sta cosa

```text
src/index.ts          avvia il server: solo il collegamento
src/config.ts         impostazioni e file delle credenziali
src/reddit/           il client di Reddit (solo GET, limite di richieste, cache) e i suoi test
src/tools/            i tre strumenti, un file ciascuno, più guards.ts (controlli), schemas.ts (argomenti) e types.ts
src/format.ts         ciò che riceve l'assistente: avviso di contenuto non fidato, tagli, post rimossi esclusi
test/                 test end-to-end e i suoi finti
scripts/              gen-reference.ts scrive il riferimento degli strumenti
```

Uno strumento nuovo è un file nuovo in `src/tools/`, aggiunto all'elenco in `src/tools/index.ts`; poi `bun run gen:docs` scrive la sua pagina.

- I test unitari usano un `fetch` finto. Il test end-to-end avvia il **processo vero del server** su stdio con un Reddit finto precaricato (`test/fake-reddit.ts`), quindi niente arriva mai in rete.
- La CI gira su un Gitea privato (`.gitea/workflows/ci.yml`); GitHub ignora quella cartella.
- Le pagine esistono in inglese e italiano affiancate in `docs/i18n/<lingua>/docusaurus-plugin-content-docs/current/`. Non c'è una cartella `docs/docs`.
