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

## The request (draft, fill the `<…>`)

**App name:** reddit-mcp (personal research tool)

**Type of use:** Personal, non-commercial research. Not a moderation tool. Not for research publication.

**Who you are:** <your first name>, an independent developer. Reddit account: u/<your username>. Contact: <your email>. Source code: <link to the repository, public if you can; a link that works helps more than any promise>.

**What the app does (in one paragraph):**
> reddit-mcp is a small, read-only tool for my own use. When I ask a question such as "what do people complain about in photo-sharing apps?", an AI assistant uses it to search a few communities and read the posts and comments that answer it. It then summarises them for me with links to the original posts. It never posts, votes, comments, messages or changes anything, it does not scrape, and it only runs when I ask.

**Why I need the API:** I am designing a personal photo-sharing app and I want to understand, from real conversations, what people like and dislike in existing apps, instead of guessing. Reddit is the place where those conversations happen. The official API is the right and polite way to read them.

**Which data, how much:** public posts and comments from a handful of communities (for example r/instagram, r/photography, r/socialmedia), found by search. A few dozen requests per session, at most a few hundred a week. Never bulk, never on a schedule.

**Rate limits:** the tool keeps below 90 requests per minute (50 by default), obeys `Retry-After` and 429 answers, caches answers in memory for 10 minutes, and sends a descriptive `User-Agent` (`platform:reddit-mcp:0.1.0 (by /u/<your username>)`).

**Storage and sharing:** none. Nothing is written to disk, there is no database or archive, nothing is shared, sold or redistributed. Deleted or removed content is never shown.

**AI and model training:** an AI assistant reads the results only to answer my question. The data is **not used to train, fine-tune or evaluate any model**.

**Personal data:** usernames appear next to the text they wrote so the answer can be cited. The tool has no function that profiles a user or lists a user's history. Adult content is excluded.

**Commercial use:** none. No revenue comes from Reddit data and none will be offered to anyone.

**Authentication:** application-only OAuth; the credentials stay in a private file on my computer and are not published.

## After sending

- Keep the ticket number. Do **not** send a second request while you wait; if there is no answer after about two weeks, reply on the same ticket.
- When you get the app: put the id and secret in `~/.config/reddit-mcp/credentials.env` (`chmod 600`), run the server once, and try a search.
- Until then, an assistant can still search Reddit with a normal web search (`site:reddit.com …`), with less detail.

## If it is refused

- Read the reason. "Lacks necessary details" means add specifics (numbers, communities, the repository link), not argue.
- Ask again only if Reddit's reply invites it, and with the answer to what they said.
- Plan B: web search with `site:reddit.com`, or a paid third-party data service. The latter is a commercial service with its own terms, and you should read them first.
