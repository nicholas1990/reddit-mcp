# Data handling

What this tool does with Reddit data, in plain words (the same text is used in the access request).

- **What it reads:** public posts and comments, through the official Data API, only when a person asks a question. Nothing is collected in bulk or on a schedule.
- **What it keeps:** answers are cached **in memory for 10 minutes** (configurable, 0 turns it off) so a repeated question costs no extra request. Nothing is written to disk by the server. When the process stops, the cache is gone.
- **What it does not do:** no database, no archive, no dataset, no resale, no sharing, no redistribution.
- **No model training.** Reddit content is shown to an AI assistant only to answer the question of the person using it, and is **not used to train, fine-tune or evaluate any model**.
- **Deleted content.** Posts and comments that are removed or deleted are not shown. Because nothing is stored, a deletion on Reddit is honoured at the next request.
- **People.** Usernames come with the text they wrote because the answer must be citable; the tool does not profile users, does not follow a person across communities, and has no function that lists a user's history.
- **Adult content** is excluded by default.
- **Limits.** Below 90 requests per minute (default 50), `Retry-After` honoured, descriptive `User-Agent`.
- **Reports.** The assistant is asked to cite the permalink of what it uses. Quotes in notes are short and attributed.
