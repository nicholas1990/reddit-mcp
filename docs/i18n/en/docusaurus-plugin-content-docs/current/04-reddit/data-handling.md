---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Data handling"
sidebar_position: 3
---

# Data handling

What this tool does with Reddit data, in plain words (the same text is used in the access request).

- **What it reads:** public posts and comments, through the official Data API, only when a person asks a question. Nothing is collected in bulk or on a schedule.
- **What it keeps:** answers are cached **in memory for 10 minutes** (configurable, 0 turns it off) so a repeated question costs no extra request. Nothing is written to disk by the server. When the process stops, the cache is gone.
- **What it does not do:** no database, no archive, no dataset, no resale, no sharing, no redistribution. The person using it keeps their own research notes, in their own words, with the link of each post used, not copies of posts.
- **No model training.** Reddit content is shown to an AI assistant only to answer the question of the person using it, and is **not used to train, fine-tune or evaluate any model**.
- **Deleted content.** Posts and comments that are removed or deleted are not shown. Because nothing is stored, a deletion on Reddit is honoured at the next request.
- **People.** Usernames come with the text they wrote because the answer must be citable; the tool does not profile users, does not follow a person across communities, and has no function that lists a user's history.
- **Adult content** is excluded by default.
- **Limits.** Below 90 requests per minute (default 50), at most **100 requests per session** (a hard cap in the code), `Retry-After` honoured, descriptive `User-Agent`.
- **Scope.** By default any public community can be read. An optional allow-list (`REDDIT_ALLOWED_SUBREDDITS`) limits it to named communities: anything outside is refused before any request is sent (for a bare post id, which does not name its community, the post is fetched and then withheld), and a search over all of Reddit is then not possible. The purpose of the access is what the request states: research for the development and planning of the user's own products.
- **Reports.** The assistant is asked to cite the permalink of what it uses. Quotes in notes are short and attributed.
