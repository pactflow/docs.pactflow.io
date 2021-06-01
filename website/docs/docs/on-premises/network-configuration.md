---
title: Network configuration
---

## Firewall Configuration

### Inbound

#### Application port

The Pactflow application runs on port `9292` by default. This can be configured by setting the [PACTFLOW_HTTP_PORT](/docs/on-premises/environment-variables#pactflow_http_port) environment variable.

### Outbound

#### Webhooks

The Pactflow application provides [webhooks](https://docs.pact.io/pact_broker/advanced_topics/webhooks) that are primarily designed for triggering builds in the **CI systems** of integrated applications. They may also be used to provide status updates to **source control systems** (eg. Github) or **team chat software** (eg. Slack). To enable Pactflow to operate correctly, network access should be configured to systems that are likely to be the targets of these webhooks.

The host names of these services should also be whitelisted in the [PACTFLOW_WEBHOOK_HOST_WHITELIST](http://localhost:3000/docs/on-premises/environment-variables/#pactflow_webhook_host_whitelist) environment variable.

## Certificate and TLS termination

The recommended configuration is to terminate TLS at the load balancer, communicating over HTTP to the target application servers.

If you would like to run Pactflow in a TLS-everywhere configuration there are several options:

* Run the Pactflow container with a sidecar reverse proxy such as nginx configured with the TLS configuration of your choosing
* Raise a feature request with us so that we can add it to our backlog, and support it natively with the underlying application server (Puma)
