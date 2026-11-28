---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "La richiesta"
sidebar_position: 2
---

# La richiesta, campo per campo

Il modulo vero è su support.reddithelp.com → Submit a request → **Data Access Request** → ruolo **«I'm a developer»** → richiesta **«I'm a developer and want to build a Reddit App that does not work in the Devvit ecosystem»**. Le risposte sono **in inglese, perché vanno inviate così**; sono le stesse della versione inglese di questa pagina, che è quella di riferimento. L'email e il nome dell'account Reddit sono di chi invia e non sono scritti qui.

The real form is at support.reddithelp.com → Submit a request → **Data Access Request** → role **"I'm a developer"** → inquiry **"I'm a developer and want to build a Reddit App that does not work in the Devvit ecosystem"**. These are the answers used (the email and the Reddit account name are the sender's own and are not written here).

**What benefit/purpose will the bot/app have for Redditors?**
It is a personal read-only research tool, so it gives Redditors no direct benefit and it does not interact with any community: it never posts, comments, votes or sends messages. Its only effect on Reddit is a small number of read requests (under 1,000 a month). The benefit is indirect: the products I build can be shaped by what people say they need, instead of by guesses.

**Provide a detailed description of what the Bot/App will be doing on the Reddit platform**
reddit-mcp is a small open-source tool that runs on my own computer. It has three read-only functions: search posts, list a community's posts (hot/top/new), and read one post with its comments. It runs only when I ask a research question, never on a schedule, and uses application-only OAuth. It does not scrape, post, comment, vote or message. Example: for the question "what do users dislike about photo-sharing apps?" an AI assistant that I run searches a few relevant public communities, reads the top posts and comments, and summarises them for me with the link of each post.
PURPOSE: research for the development and planning of my own software products, in six areas: feedback on existing apps, unmet user needs, market trends in apps and online services, pricing and monetisation, technical choices (how other developers solve a problem), and privacy/platform rules.
LIMITS enforced by the code: at most 100 requests per session (one session = one research question), about 10 sessions a month (well under 1,000 requests a month), 50 requests per minute by default and never more than 90, Retry-After and 429 honoured, answers cached 10 minutes in memory only, descriptive User-Agent that names my Reddit account.
DATA: nothing is stored by the tool (no database, archive or dataset), nothing is shared, sold or redistributed. I keep my own research notes in my own words with the link of each post, not copies of posts. Removed and deleted posts and comments are not shown, adult content is excluded, there is no function that profiles a user or lists a user's history, and usernames appear only next to what they wrote so it can be cited.
AI USE, STATED PLAINLY: an AI assistant reads the results only to answer my question; the Reddit data is NOT used to train, fine-tune or evaluate any model.
COMMERCIAL: this is internal research that informs my own decisions; no Reddit data is sold, licensed, shared or used inside any product. If you consider this use needs a commercial approval, please tell me and I will follow that process.
I will register the app and create a developer profile so that it gets the App label. This is my only request for this use case.

**What is missing from Devvit that prevents building on that platform?**
Devvit is for apps that run on Reddit's own platform, inside Reddit. My use is the opposite: an external, local, read-only client that lets an AI assistant running on my own computer search and read public discussions when I ask it a question. It is not an app that lives in a community, so it cannot be hosted on Devvit.

**Provide a link to source code or platform that will access the API**
https://github.com/nicholas1990/reddit-mcp

**What subreddits do you intend to use the bot/app in?**
None: it is read-only and never posts or interacts in any subreddit. It reads public communities chosen per research question, in the six areas described above (for example r/instagram and r/socialmedia for apps, r/photography for photo tools, r/privacy for privacy, r/ContentCreators for creator tools, and developer communities for technical questions).

**If applicable, what username will you be operating this Bot/App under?**
Not applicable: it does not post, so no bot account is used (application-only OAuth).
