# Getting access to the Reddit Data API

Since 11 November 2025 Reddit no longer lets anyone create an API app on their own: you **ask first and wait for approval** (its [Responsible Builder Policy](https://support.reddithelp.com/hc/articles/42728983564564)). Reddit aims at about 7 days, but waits are often longer, and incomplete or vague requests are refused. This page is the kit to send **one good request**.

> I could not read the request form itself, so the fields below are what such forms usually ask. Check the real form on support.reddithelp.com and adapt the answers; keep their meaning.

## Rules to respect (they decide the outcome)

1. **One request only.** The policy forbids several requests, or several accounts, for the same use. Send it once, well.
2. **Be truthful about the purpose.** Misrepresenting or hiding how or why you use the data is a reason to be refused and banned. Say plainly that an AI assistant reads the results.
3. **Non-commercial.** The free tier is for personal, non-commercial use. Selling, licensing or sharing Reddit data needs written approval, and this tool does none of it.
4. **Use the account that will own the app**, with a real history, and the same contact in every field.

## Decide before sending (this changes what you can honestly say)

The research is meant to help design a personal app that is **not launched and earns nothing from Reddit data**. If that app later becomes a business, the use may stop counting as non-commercial and you would have to ask again. Write the request so it is true today, and do not promise what you cannot keep.

## What to say: be specific, and true

A request that says "research" is refused. One that names the question, the communities, the volume and the output is read. The plan below is real, so you can say it without bending anything: it is the competitor study of Lumen, a personal photo-sharing app, starting from Instagram.

**The five questions** (each one is answered from posts and comments, with links):
1. What do people dislike about the Instagram feed and its ranking?
2. How do people describe the "see everything about my account / download my data" options, and what do they miss in them?
3. What do creators say about payments, reach and monetisation?
4. What do people complain about in moderation, bans and appeals?
5. What do photographers say about photo and video quality loss?

**The communities** (the list is in the code: anything else is refused): r/instagram, r/socialmedia, r/photography, r/mobilephotography, r/privacy, r/ContentCreators. Check the names before sending.

**The volume** (enforced by the code, not just promised): at most 100 requests per session, a session is one research question, about ten sessions a month: **under 1,000 requests a month**, never more than 50 a minute.

**The output:** private notes for me, with the link of every post used. Nothing is published, sold or shared.

## The request (draft, fill the `<…>`)

**App name:** reddit-mcp (personal research tool)

**Type of use:** Personal, non-commercial research. Not a moderation tool. Not academic research.

**Who you are:** <your first name>, an independent developer. Reddit account: u/<your username>. Contact: <your email>. Source code: https://github.com/nicholas1990/reddit-mcp

**What the app does:**
> reddit-mcp is a small read-only tool for my own use. When I ask a research question, an AI assistant uses it to search six named communities and read the posts and comments that answer it, then summarises them for me with links to the originals. It never posts, votes, comments or messages, it does not scrape, and it only runs when I ask.

**Why I need the API:** I am designing a personal photo-sharing app that is not launched. I want to learn from real conversations what people like and dislike in existing apps, with five specific questions: the feed and its ranking, the "see and download my data" options, creator payments and reach, moderation and appeals, and photo quality. The official API is the right way to read those conversations.

**Which data, how much:** public posts and comments from six communities (r/instagram, r/socialmedia, r/photography, r/mobilephotography, r/privacy, r/ContentCreators), found by search. The code refuses any other community. At most 100 requests per session and about 1,000 a month. Never bulk, never on a schedule.

**Rate limits:** below 50 requests per minute (the code does not allow more than 90), `Retry-After` and 429 honoured, answers cached 10 minutes in memory, descriptive `User-Agent`: `linux:reddit-mcp:0.1.0 (by /u/<your username>)`.

**Storage and sharing:** none. Nothing is written to disk, no database, no archive, nothing shared, sold or redistributed. Deleted or removed content is never shown.

**AI and model training:** an AI assistant reads the results only to answer my question. The data is **not used to train, fine-tune or evaluate any model**.

**Personal data:** usernames appear next to what they wrote only so the answer can be cited. There is no function that profiles a user or lists a user's history. Adult content is excluded.

**Commercial use:** none. No revenue comes from Reddit data and none will be offered to anyone.

**Authentication:** application-only OAuth; the credentials are in a private file on my computer.

## What makes a request stronger

- **A repository that can be opened.** Make it public before sending: a reader sees the read-only code, the allow-list and the cap, and does not have to trust a sentence. This is the single best thing you can do.
- **An account with a history.** A new empty account looks like a throwaway.
- **The same name and email everywhere** (form, user agent, repository).
- **Honesty about the AI.** Say it once, clearly, with the no-training line. It is what they ask about, and hiding it is what gets people banned.
- **No big promises.** Do not claim a company, a university, a launch date or a user base you do not have.

## After sending

- Keep the ticket number. Do **not** send a second request while you wait; if there is no answer after about two weeks, reply on the same ticket.
- When you get the app: put the id and secret in `~/.config/reddit-mcp/credentials.env` (`chmod 600`), run the server once, and try a search.
- Until then, an assistant can still search Reddit with a normal web search (`site:reddit.com …`), with less detail.

## If it is refused

- Read the reason. "Lacks necessary details" means add specifics (numbers, communities, the repository link), not argue.
- Ask again only if Reddit's reply invites it, and with the answer to what they said.
- Plan B: web search with `site:reddit.com`, or a paid third-party data service. The latter is a commercial service with its own terms, and you should read them first.
