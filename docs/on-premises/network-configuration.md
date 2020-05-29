---
title: Network configuration
---

The Pactflow application provides [webhooks](https://docs.pact.io/pact_broker/advanced_topics/webhooks) that are primarily designed for triggering builds in the **CI systems** of integrated applications. They may also be used to provide status updates to **source control systems** (eg. Github) or **team chat software** (eg. Slack). To enable Pactflow to operate correctly, network access should be configured to systems that are likely to be the targets of these webhooks.

The host names of these services should also be whitelisted in the [PACTFLOW_WEBHOOK_HOST_WHITELIST environment variable](http://localhost:3000/docs/on-premises/environment-variables/#pactflow_webhook_host_whitelist).