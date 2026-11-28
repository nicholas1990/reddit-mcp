---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Getting access"
sidebar_position: 1
---

# Getting access to the Reddit Data API

Since 11 November 2025 Reddit no longer lets anyone create an API app on their own: you **ask first and wait for approval** (its [Responsible Builder Policy](https://support.reddithelp.com/hc/articles/42728983564564)). Reddit aims at about 7 days, but waits are often longer, and vague or incomplete requests are refused. This page explains how to send **one good request**. The text that was written for this tool is in [The request](request.md).

## Where the request goes

support.reddithelp.com → *Submit a request* → **Data Access Request** → role **I'm a developer** → inquiry **I'm a developer and want to build a Reddit App that does not work in the Devvit ecosystem**. Reddit's own page says to go through Devvit first and to file this ticket only when Devvit does not support the use. Devvit apps live inside Reddit; this tool is an external, local, read-only client, so it cannot be one.

## Rules that decide the outcome

1. **One request only.** The policy forbids several requests, or several accounts, for the same use.
2. **Be truthful about the purpose.** Hiding how or why the data is used is a reason to be refused and banned. Say plainly that an AI assistant reads the results.
3. **Non-commercial.** The free tier is for personal, non-commercial use. Selling, licensing or sharing Reddit data needs written approval, and this tool does none of it. If the research later feeds a business, ask again.
4. **Use the account that will own the app**, with a real history, and the same contact in every field.

## What to say: the purpose, the limits, the data

A request that only says "research" is refused. The one written here names:

- **the purpose:** research for the development and planning of the author's own software, in six areas (feedback on existing apps, unmet needs, market trends, pricing and monetisation, technical choices, privacy and platform rules);
- **the scope:** public communities chosen per question, not a fixed list; the code can be limited to a list with `REDDIT_ALLOWED_SUBREDDITS`;
- **the volume, enforced by the code:** at most 100 requests per session, about 10 sessions a month (**under 1,000 requests a month**), 50 per minute by default and never more than 90;
- **the data:** nothing stored, shared or sold; no model training; no user profiling; adult and removed content excluded;
- **the output:** private notes in the author's own words, with the link of each post.

## What makes a request stronger

- **A public repository** that can be opened: a reader sees the read-only code and the cap and does not have to trust a sentence.
- **An account with a history.** A new empty account looks like a throwaway.
- **The same name and email everywhere** (form, user agent, repository).
- **Honesty about the AI**, said once, clearly, with the no-training line.
- **No big promises.** No company, university, launch date or user base you do not have.

## After sending

- Keep the ticket number. Do **not** send a second request while you wait; if there is no answer after about two weeks, reply on the same ticket.
- When the app is approved: register it, put the id and secret in `~/.config/reddit-mcp/credentials.env` (`chmod 600`), start the server and try a search.
- Until then an assistant can still use a normal web search (`site:reddit.com …`), with less detail.

## If it is refused

- Read the reason. "Lacks necessary details" means add specifics (numbers, the purpose, the repository link), not argue.
- Ask again only if Reddit's reply invites it, and answer what they said.
- Plan B: web search with `site:reddit.com`, or a paid third-party data service, which has its own terms: read them first.
