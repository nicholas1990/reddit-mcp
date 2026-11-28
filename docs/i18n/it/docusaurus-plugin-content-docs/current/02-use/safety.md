---
title: Sicurezza
sidebar_position: 2
---

# Sicurezza

- **Sola lettura.** Una sola uscita: un `GET` verso `oauth.reddit.com`. Un test fallisce se mai viene usato un altro metodo.
- **Le credenziali** vengono da un file privato (modo 600, imposto) o dall'ambiente. Non vengono mai stampate né fanno parte della configurazione dell'assistente.
- **Gli input sono controllati.** Nomi di community e id dei post seguono schemi rigidi, e si accettano solo link `reddit.com` e `redd.it`, quindi l'assistente non può far scaricare al server un altro sito.
- **Il testo di Reddit non è fidato.** Può contenere istruzioni rivolte all'assistente (prompt injection). Ogni risposta inizia con un avviso, ma la vera difesa sta lato client: **non dare all'assistente che usa questo server accesso a file privati né una shell**, così un post ostile non ha niente da rubare né da eseguire.
- **Contenuti rimossi o cancellati** non vengono mai mostrati, e non si conserva niente: una cancellazione su Reddit è rispettata alla richiesta successiva.
- **Persone.** Non esiste una funzione che profili un utente o elenchi la sua cronologia. I nomi utente compaiono solo accanto a ciò che hanno scritto.

Per segnalare un problema apri un avviso di sicurezza privato sul repository.
