---
title: API Tokens
---

![API Token Screen](/ui/api-tokens.png)

Here you can copy and re-generate your API tokens. There are two tokens you can use, a read only token
for anything that needs to download pacts, and a read-write token for anything required to publish
pact files or verification results. The read/write token should only be used by your CI when publishing pacts and verification results, and the read only token should be used for a developer's machine. abcd

The *Copy* button allows you to copy the token values without displaying them, and the *Regenerate* button will allow you to generate a new value for that token.
