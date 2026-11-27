# The request, ready to paste

For the single text field of the form "Submit a request → Data Access Request → I'm a developer" on support.reddithelp.com.
Before pasting: replace `<REDDIT USERNAME>`, and leave your email in the form's own email field (not in the text).

---

**Subject / summary:** Read-only API access for a personal developer tool (reddit-mcp), not supported by Devvit

Hello,

I am an independent developer and I am asking for read-only Data API access for a small open-source tool, reddit-mcp: https://github.com/nicholas1990/reddit-mcp (public, MIT, the code and its limits can be read there). My Reddit account is u/<REDDIT USERNAME>. This is my only request for this use case.

**Why Devvit does not fit.** Devvit builds apps that run inside Reddit. My tool runs on my own computer and lets an AI assistant that I use read public Reddit discussions when I ask it a research question. It reads from outside Reddit, so I could not build it on Devvit.

**What it does.** Three read-only functions: search posts, list a community's posts, read one post with its comments. It never posts, votes, comments, messages, or changes anything, it does not scrape, it does not run on a schedule: it runs only when I ask a question. It uses application-only OAuth, and I will register the app and create a developer profile so that it gets the App label.

**Purpose and scope.** Research for the development and planning of my own software products. The questions fall into six areas, and for each question I choose the public communities that fit it:
1. feedback on existing apps and services (what users like and dislike);
2. unmet needs and problems of users in a field;
3. market trends in apps, creator tools and online services;
4. pricing and monetisation (what people accept to pay for);
5. technical choices (how other developers solve a problem, common errors in libraries and services);
6. privacy, platform rules and compliance as users and developers discuss them.
I do not use Reddit data for anything else.

**Volume and limits.** The code enforces them: at most 100 requests per session (a session is one research question), about ten sessions a month, so well under 1,000 requests a month; 50 requests per minute by default and never more than 90; `Retry-After` and 429 answers are honoured; answers are cached in memory for 10 minutes; descriptive User-Agent `linux:reddit-mcp:0.1.0 (by /u/<REDDIT USERNAME>)`.

**Data handling.** I do not store Reddit content: nothing is written to disk by the tool, there is no database, archive or dataset, and nothing is shared, sold or redistributed. I keep my own research notes, written in my own words with the link of each post used, not copies of posts. Posts and comments that are removed or deleted are not shown, adult content is excluded, and the tool has no function that profiles a user or lists a user's history. Usernames appear only next to the text they wrote, so that the answer can be cited.

**AI use, stated plainly.** An AI assistant reads the results, only to answer my question. The Reddit data is **not used to train, fine-tune or evaluate any model**.

**Commercial use.** This is internal research that informs my own decisions. No Reddit data is sold, licensed, shared or used inside any product, and I earn nothing from the data itself. If you consider that this use needs a commercial approval, please tell me and I will follow that process.

I am glad to change the scope or add any safeguard you require. Thank you for your time.
