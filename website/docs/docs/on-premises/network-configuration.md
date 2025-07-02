---
title: Network configuration
---

## Firewall Configuration

### Inbound

#### Application port

The PactFlow application runs on port `9292` by default. This can be configured by setting the [PACTFLOW_HTTP_PORT](/docs/on-premises/environment-variables#pactflow_http_port) environment variable.

### Outbound

#### Webhooks

The PactFlow application provides [webhooks](https://docs.pact.io/pact_broker/advanced_topics/webhooks) that are primarily designed for triggering builds in the **CI systems** of integrated applications. They may also be used to provide status updates to **source control systems** (eg. Github) or **team chat software** (eg. Slack). To enable PactFlow to operate correctly, network access should be configured to systems that are likely to be the targets of these webhooks.

The host names of these services should also be whitelisted in the [PACTFLOW_WEBHOOK_HOST_WHITELIST](/docs/on-premises/environment-variables/#pactflow_webhook_host_whitelist) environment variable.

## Certificate and TLS termination

The recommended configuration is to terminate TLS at the load balancer, communicating over HTTP to the target application servers, which in turn communicate over local sockets to applications within the container.

If you would like to run PactFlow in a TLS-everywhere configuration, modify the HAProxy configuration file (`/tmp/haproxy.cfg`) to bind a certificate to the `frontend`, and ensure the certificate has been appropriately mounted/added to the container.

Refer to the [HAProxy documentation](https://www.haproxy.com/documentation/haproxy-configuration-tutorials/security/ssl-tls/client-side-encryption/) for further information.