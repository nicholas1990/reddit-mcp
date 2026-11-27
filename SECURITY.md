# Security

- **Read-only.** The client has one way out, a `GET` to `oauth.reddit.com`, and a test checks that no other method is ever used.
- **Credentials** are read from `~/.config/reddit-mcp/credentials.env` (mode 600, enforced) or the environment, never from a repository, and never printed. Do not paste them in a chat or an issue.
- **Reddit text is untrusted.** It can contain instructions aimed at the assistant (prompt injection). Every answer starts with a notice, but the real defence is on the client side: give the assistant that uses this server **no access to private files and no shell**, so a hostile post has nothing to steal and nothing to run.
- **Inputs are validated:** community names, post ids and links are checked against strict patterns, and only `reddit.com` / `redd.it` links are accepted.

To report a problem, open a private security advisory on the repository, or write to the maintainer.
