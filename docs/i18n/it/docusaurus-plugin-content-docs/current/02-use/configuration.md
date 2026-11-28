---
title: Configurazione
sidebar_position: 1
---

# Configurazione

Le impostazioni si leggono dall'ambiente e, per quelle che mancano, da `~/.config/reddit-mcp/credentials.env`.

| Impostazione | Predefinito | Significato |
| --- | --- | --- |
| `REDDIT_CLIENT_ID` | obbligatoria | L'id della tua app approvata |
| `REDDIT_CLIENT_SECRET` | obbligatoria | Il suo segreto. Tienilo solo nel file privato |
| `REDDIT_USER_AGENT` | obbligatoria | Reddit ne vuole uno unico e descrittivo: `piattaforma:app:versione (by /u/nome)` |
| `REDDIT_RATE_PER_MIN` | `50` | Il nostro tetto, da 1 a 90. Il limite gratuito di Reddit è 100 al minuto |
| `REDDIT_CACHE_MINUTES` | `10` | Per quanto una risposta resta in memoria, da 0 a 60. `0` spegne la cache |
| `REDDIT_MAX_REQUESTS` | `100` | Tetto fisso di richieste a Reddit per una esecuzione del server, da 1 a 1000 |
| `REDDIT_ALLOW_NSFW` | `false` | `true` mostra i post segnati per adulti |
| `REDDIT_ALLOWED_SUBREDDITS` | vuoto | Facoltativa, separata da virgole. Se c'è, solo queste community si possono cercare o leggere, e la ricerca su tutto Reddit è rifiutata |

Un valore fuori dall'intervallo viene ignorato e si usa quello predefinito.

## Come si comportano i limiti

- **Al minuto:** finestra mobile. Quando è piena il server aspetta invece di fallire. Su un `429` aspetta il tempo chiesto da Reddit (al massimo due minuti) e riprova.
- **Per sessione:** una esecuzione del server è una sessione. Quando si raggiunge `REDDIT_MAX_REQUESTS` ogni chiamata successiva fallisce con un messaggio chiaro finché il server non viene riavviato. Conta anche la richiesta del token.
- **Cache:** la stessa domanda, con gli stessi argomenti, costa una richiesta ogni dieci minuti.
