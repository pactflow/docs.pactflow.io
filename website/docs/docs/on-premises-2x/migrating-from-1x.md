---
title: Migrating from 1.x
---

This major release introduces significant architectural changes and new features:

1. A redesigned user interface  
   - Learn more about the new interface and navigation in the [UI migration guide](/docs/user-interface/migration/new).
2. A switch to an Ubuntu Linux base image (from Alpine) for improved compatibility and security posture.
3. Internal architecture updates, including the use of `HAProxy` for traffic routing and `supervisord` for process management.
4. New caching and session management layers, requiring a Redis Serialization Protocol (RESP)-compatible key/value storage engine.

## Migration notes

The 2.x release line is almost entirely backwards compatible with 1.x. Only the following changes are required to install and run it:

1. A [Redis-compatible data store](/docs/on-premises-2x/redis) (such as Redis or Valkey) is now required.  
   - Ensure you set the [`REDIS_URL`](/docs/on-premises-2x/environment-variables#redis_url) environment variable.
2. `PACTFLOW_COOKIE_SECRET` must now be at least 64 characters. See [documentation](/docs/on-premises-2x/environment-variables#pactflow_cookie_secret) for details.
3. The `PACTFLOW_LOG_FORMAT` environment variable is deprecated and has no effect. All logs are now output in JSON only.
4. The base image has changed from Alpine Linux to Ubuntu 24.04. If you customized the image, review and update your setup, including any additional tools or libraries.

> **Note**: This release does not include any database or data migrations. You can freely upgrade or roll back between 1.x and 2.x without concerns about database compatibility. All existing API calls, SDKs, and CLI integrations continue to work as expected.

## Migration Checklist

Use this checklist to prepare for upgrading from PactFlow 1.x to 2.x.  

✅ **Redis requirement**  
- [ ] Provision a [Redis-compatible data store](/docs/on-premises-2x/redis) (Redis or Valkey).  
- [ ] Set the [`REDIS_URL`](/docs/on-premises-2x/environment-variables#redis_url) environment variable.  

✅ **Cookie secret length**  
- [ ] Ensure `PACTFLOW_COOKIE_SECRET` is **at least 64 characters**.  
- [ ] Update your environment configuration if required.  

✅ **Logging format**  
- [ ] Remove any usage of the `PACTFLOW_LOG_FORMAT` environment variable.  
- [ ] Update monitoring/forwarding pipelines to expect **JSON logs only**.  

✅ **Base image**  
- [ ] Note that the base image has changed from Alpine Linux to **Ubuntu 24.04**.  
- [ ] If you maintain a custom image, review and update any tools, libraries, or scripts.  