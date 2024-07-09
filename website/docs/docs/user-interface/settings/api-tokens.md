---
title: API Tokens
---

This screen helps you copy and re-generate your API tokens. There are two types of API tokens you can use:

![API Token Screen](/ui/clarity/settings-tokens-user.png)

1. The read only token for anything that needs to download pacts. It should be used for a developer's machine.

2. The read-write token for anything required to publish pact files or verification results. It should only be used by your CI when publishing pacts and verification results.

**Buttons**
1. The Copy button allows you to copy the token values without displaying them.
  1. You can also copy the value as
     1. unix formatted environment variables
     2. Windows formatted environment variables
     3. PowerShell formatted environment variables
     4. cURL requests
     5. fetch requests
2. The Regenerate button allows you to generate a new value for that token. 

## System Accounts

You can also access the API tokens for any System Accounts for which you have access. To see the tokens, you will need the appropriate  `system_account:manage` or `system_account:read` [permissions](../../permissions/permissions.md).

![API Token Screen](/ui/clarity/settings-tokens.png)