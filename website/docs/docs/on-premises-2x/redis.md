---
title: Redis Cache
---

## Introduction

PactFlow requires a Redis-compatible storage for the following functions:

- User session management
- UI caching for performance

## Session management

User sessions are stored in Redis. Only a 128-bit session ID is shared with the user's browser. This ID is valid for 30 days and is signed with a server-side secret to prevent tampering—regardless of the cookie's expiry time. This protects against cookie replay attacks.

All user data, including `idToken` and `accessToken`, is stored server-side and is never exposed to the user.

## Caching

To improve UI performance, PactFlow uses a server-side caching layer.

This may result in temporary staleness—displayed content can differ based on when data was last fetched. Differences may appear between users or across browser sessions.

PactFlow uses a *per-user* server-side cache, following a `stale-while-revalidate` strategy:

- **Hot cache:** Data is used without validation.
- **Warm cache:** Data is served immediately, and the cache is refreshed in the background.
- **Cold cache:** The UI blocks until data is fetched from the API.

This approach balances performance and freshness.

When a user writes data through the UI, their *entire user cache* is invalidated immediately. This ensures correctness for the current user. However, if the change is made by another user or via the API, it may take longer to appear.

As a fallback, the PactFlow UI follows HTTP cache-control conventions. If a user performs a hard refresh (`Shift+Refresh`), the browser sends headers like `Cache-Control: no-cache` or `Pragma: no-cache`, which bypass the cache.

## Supported versions

Redis 7.0 and later is supported.