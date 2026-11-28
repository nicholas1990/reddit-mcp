---
# Managed by Notarius (notarius sync). Do not edit: change notarius.json, or put your own rules in a file Notarius does not manage.
title: "Safety"
sidebar_position: 2
---

# Safety

- **Read-only.** One way out: a `GET` to `oauth.reddit.com`. A test fails if any other method is ever used.
- **Credentials** come from a private file (mode 600, enforced) or the environment. They are never printed and never part of the configuration of the assistant.
- **Inputs are checked.** Community names and post ids match strict patterns, and only `reddit.com` and `redd.it` links are accepted, so the assistant cannot make the server fetch another site.
- **Reddit text is untrusted.** It can contain instructions aimed at the assistant (prompt injection). Each answer starts with a notice, but the real defence is on the client side: **give the assistant that uses this server no access to private files and no shell**, so a hostile post has nothing to steal and nothing to run.
- **Removed and deleted content** is never shown, and nothing is stored, so a deletion on Reddit is honoured at the next request.
- **People.** There is no function that profiles a user or lists a user's history. Usernames appear only next to what they wrote.

To report a problem, open a private security advisory on the repository.
