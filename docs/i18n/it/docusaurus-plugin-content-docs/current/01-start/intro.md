---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Introduzione"
sidebar_position: 1
slug: /
---

# reddit-mcp

**reddit-mcp** permette a un assistente AI di cercare e leggere Reddit tramite la **Data API ufficiale**, per ricerche personali e non commerciali: come le persone parlano di un'app, cosa manca loro in un prodotto, quali tendenze stanno crescendo. Parla il [Model Context Protocol](https://modelcontextprotocol.io) (MCP), quindi funziona con qualunque client MCP.

## Cosa lo rende diverso

- **Di sola lettura per costruzione.** Il client ha una sola uscita, un `GET`. Non esiste un percorso nel codice che pubblichi, voti, commenti o scriva messaggi, e un test lo verifica.
- **Un buon cittadino dell'API.** OAuth solo-app, uno `User-Agent` descrittivo, un limite a finestra mobile sotto quello di Reddit, `Retry-After` rispettato, risposte in cache in memoria e un tetto fisso di richieste per sessione.
- **Non conserva niente.** Nessun database, archivio o dataset, nessun addestramento di modelli. Vedi [Trattamento dei dati](../04-reddit/data-handling.md).
- **Pensato per testo non fidato.** Tutto su Reddit è scritto da sconosciuti. Ogni risposta inizia con un avviso: è un dato, non un'istruzione. I testi lunghi sono tagliati, i contenuti rimossi e per adulti sono esclusi, e ogni risultato porta il suo link così l'assistente può citarlo.
- **Generico, ma restringibile.** Di base si può leggere qualunque community pubblica. Un elenco facoltativo lo limita a poche.

## Cosa serve

- [Bun](https://bun.sh) per avviare il server.
- Un'app della Data API di Reddit. Da novembre 2025 Reddit le approva una per una: vedi [Ottenere l'accesso](../04-reddit/access.md), che contiene anche la richiesta scritta per questo strumento.

Poi: [Per iniziare](getting-started.md).
