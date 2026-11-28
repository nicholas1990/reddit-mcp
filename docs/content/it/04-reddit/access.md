---
title: "Ottenere l'accesso alla Data API di Reddit"
label: "Ottenere l'accesso"
order: 1
---

Dall'11 novembre 2025 Reddit non lascia più creare da soli un'app API: **si chiede prima e si aspetta l'approvazione** (la sua [Responsible Builder Policy](https://support.reddithelp.com/hc/articles/42728983564564)). Reddit punta a circa 7 giorni, ma le attese spesso sono più lunghe, e le richieste vaghe o incomplete vengono rifiutate. Questa pagina spiega come mandare **una richiesta fatta bene**. Il testo scritto per questo strumento è in [La richiesta](request.md).

## Dove va la richiesta

support.reddithelp.com → *Submit a request* → **Data Access Request** → ruolo **I'm a developer** → richiesta **I'm a developer and want to build a Reddit App that does not work in the Devvit ecosystem**. La pagina di Reddit per sviluppatori dice di passare prima da Devvit e di aprire questo ticket solo se Devvit non supporta l'uso. Le app Devvit vivono dentro Reddit; questo strumento è un client esterno, locale e di sola lettura, quindi non può esserlo.

## Regole che decidono l'esito

1. **Una sola richiesta.** La policy vieta più richieste, o più account, per lo stesso uso.
2. **Dire il vero sullo scopo.** Nascondere come o perché si usano i dati è motivo di rifiuto e di ban. Di' chiaramente che un assistente AI legge i risultati.
3. **Non commerciale.** Il livello gratuito è per uso personale e non commerciale. Vendere, concedere in licenza o condividere dati di Reddit richiede un'approvazione scritta, e questo strumento non fa niente di tutto ciò. Se la ricerca in futuro alimenta un'attività, si chiede di nuovo.
4. **Usa l'account che sarà proprietario dell'app**, con una storia vera, e lo stesso contatto in ogni campo.

## Cosa dire: scopo, limiti, dati

Una richiesta che dice solo «ricerca» viene rifiutata. Quella scritta qui indica:

- **lo scopo:** ricerca per lo sviluppo e la pianificazione del software dell'autore, in sei ambiti (opinioni sulle app esistenti, bisogni non coperti, tendenze di mercato, prezzi e monetizzazione, scelte tecniche, regole di privacy e piattaforme);
- **l'ambito:** community pubbliche scelte per domanda, non un elenco fisso; il codice si può limitare a un elenco con `REDDIT_ALLOWED_SUBREDDITS`;
- **il volume, imposto dal codice:** al massimo 100 richieste per sessione, circa 10 sessioni al mese (**meno di 1.000 richieste al mese**), 50 al minuto di base e mai più di 90;
- **i dati:** niente conservato, condiviso o venduto; nessun addestramento di modelli; nessuna profilazione; contenuti per adulti e rimossi esclusi;
- **il risultato:** appunti privati con parole dell'autore, con il link di ogni post.

## Cosa rende più forte una richiesta

- **Un repository pubblico** che si può aprire: chi legge vede il codice di sola lettura e il tetto e non deve fidarsi di una frase.
- **Un account con una storia.** Un account nuovo e vuoto sembra usa-e-getta.
- **Lo stesso nome e la stessa email ovunque** (modulo, user agent, repository).
- **Onestà sull'AI**, detta una volta, chiaramente, con la riga sul non addestramento.
- **Niente promesse grosse.** Nessuna azienda, università, data di lancio o base di utenti che non hai.

## Dopo l'invio

- Tieni il numero del ticket. **Non** mandare una seconda richiesta mentre aspetti; se dopo circa due settimane non c'è risposta, rispondi sullo stesso ticket.
- Quando l'app è approvata: registrala, metti id e segreto in `~/.config/reddit-mcp/credentials.env` (`chmod 600`), avvia il server e prova una ricerca.
- Fino ad allora un assistente può usare una normale ricerca web (`site:reddit.com …`), con meno dettaglio.

## Se viene rifiutata

- Leggi il motivo. «Lacks necessary details» vuol dire aggiungere specifiche (numeri, scopo, link al repository), non discutere.
- Chiedi di nuovo solo se la risposta di Reddit lo invita, e rispondi a ciò che hanno detto.
- Piano B: ricerca web con `site:reddit.com`, o un servizio dati a pagamento di terzi, che ha le sue condizioni: leggile prima.
