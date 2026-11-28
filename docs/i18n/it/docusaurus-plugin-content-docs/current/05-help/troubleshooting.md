---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Risoluzione dei problemi"
sidebar_position: 1
---

# Risoluzione dei problemi

| Cosa vedi | Cosa significa |
| --- | --- |
| `Missing REDDIT_CLIENT_ID …` all'avvio | Il file delle credenziali manca o è incompleto. Vedi [Per iniziare](../01-start/getting-started.md) |
| `… must be private (chmod 600)` | Altri utenti possono leggere il file delle credenziali. Esegui `chmod 600` |
| `Reddit refused the credentials (HTTP 401/403)` | Id o segreto sbagliati, o l'accesso non è ancora approvato |
| `Reddit says this is forbidden` | Una community privata o in quarantena, o non coperta dall'accesso |
| `Not found` | Il post o la community non esiste o è stato rimosso |
| `Request budget of this session reached` | Raggiunto `REDDIT_MAX_REQUESTS`. Avvia una nuova sessione, o alzalo con consapevolezza |
| `Only these communities are allowed` | `REDDIT_ALLOWED_SUBREDDITS` è impostata e la community non c'è |
| `Reddit is limiting requests right now` | Reddit ha risposto 429 tre volte. Aspetta qualche minuto |

I messaggi di errore dello strumento restano in inglese: sono il testo che legge l'assistente.
