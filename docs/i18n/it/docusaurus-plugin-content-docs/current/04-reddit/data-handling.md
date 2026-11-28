---
title: Trattamento dei dati
sidebar_position: 3
---

# Trattamento dei dati

Cosa fa questo strumento con i dati di Reddit, in parole semplici. Lo stesso testo (in inglese) è usato nella richiesta di accesso, e la versione inglese di questa pagina è quella di riferimento.

- **Cosa legge:** post e commenti pubblici, tramite la Data API ufficiale, solo quando una persona fa una domanda. Niente viene raccolto in blocco o a intervalli.
- **Cosa conserva:** le risposte restano in cache **in memoria per 10 minuti** (configurabile, 0 la spegne), così una domanda ripetuta non costa una richiesta in più. Il server non scrive niente su disco. Quando il processo si ferma, la cache sparisce.
- **Cosa non fa:** nessun database, archivio, dataset, rivendita, condivisione o ridistribuzione. Chi lo usa tiene i propri appunti di ricerca, con parole sue e con il link di ogni post usato, non copie dei post.
- **Nessun addestramento di modelli.** I contenuti di Reddit vengono mostrati a un assistente AI solo per rispondere alla domanda di chi lo usa, e **non servono ad addestrare, rifinire o valutare alcun modello**.
- **Contenuti cancellati.** Post e commenti rimossi o cancellati non vengono mostrati. Poiché non si conserva niente, una cancellazione su Reddit è rispettata alla richiesta successiva.
- **Persone.** I nomi utente compaiono insieme al testo che hanno scritto perché la risposta deve essere citabile; lo strumento non profila gli utenti, non segue una persona tra le community e non ha funzioni che elenchino la cronologia di un utente.
- **Contenuti per adulti:** esclusi di base.
- **Limiti.** Sotto 90 richieste al minuto (50 di base), al massimo **100 richieste per sessione** (tetto fisso nel codice), `Retry-After` rispettato, `User-Agent` descrittivo.
- **Ambito.** Di base si può leggere qualunque community pubblica. Un elenco facoltativo (`REDDIT_ALLOWED_SUBREDDITS`) lo limita a community indicate: tutto il resto è rifiutato prima che parta una richiesta (per un id di post nudo, che non dice la community, il post viene scaricato e poi trattenuto), e la ricerca su tutto Reddit non è più possibile. Lo scopo dell'accesso è quello dichiarato nella richiesta: ricerca per lo sviluppo e la pianificazione dei propri prodotti.
- **Rapporti.** All'assistente si chiede di citare il link di ciò che usa. Le citazioni negli appunti sono brevi e attribuite.
