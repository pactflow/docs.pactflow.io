---
title: PactFlow On-Premises Architecture
sidebar_label: Architecture
---

:::warning
The 1.x line of PactFlow On-Prem is now in maintenance mode and will only receive security updates. It will reach end of life on March 11, 2026, after which it will no longer be supported.

To ensure you have access to the latest features and improvements, please upgrade to 2.x as soon as possible.
:::

## System architecture

### Minimum requirements

* An application server capable of running Docker
* PostgreSQL database
* SAML IDP for SSO
* PactFlow license file

### Recommended architecture

* Deploy to a service designed for Docker container orchestration (ECS, Fargate, Kubernetes etc.)

### Example AWS deployment using ECS

![System architecture](/img/saas-architecture-aws.png)

## Internal architecture

The PactFlow On-Premises application is distributed as a Docker image. It is based on the open source [Pact Broker](https://github.com/pact-foundation/pact_broker), which is a Ruby application.

### Application user requirements

The PactFlow application does not need any elevated privileges to run. It runs under the user `app:app`.

### Application port

The PactFlow application runs on port `9292` by default. This can be configured by setting the [PACTFLOW_HTTP_PORT](/docs/on-premises/environment-variables#pactflow_http_port) environment variable.

### Healthcheck endpoint

A healthcheck endpoint for use by a Docker container managment service is available at `http://<HOST>/diagnostic/status/heartbeat`. No authentication is required. This endpoint does not make a connection to the database.

If the healthcheck is running from inside the container, make sure to use the port defined in the environment variable `$PACTFLOW_HTTP_PORT`, which defaults to 9292. You can use `wget` to perform the healthcheck request.

An example healthcheck configuration for Docker Compose:

```yaml
healthcheck:
  test: ["CMD", "wget", "-nv", "-t1", "--spider", "http://localhost:9292/diagnostic/status/heartbeat"]
  interval: 30s
  timeout: 10s
  retries: 3
```

To check the connection to the database, use the endpoint `/diagnostic/status/dependencies`. This endpoint should not be used by Docker container managment services, as unrelated database issues might cause the Docker container to churn.

### License file

PactFlow on-premises version requires a license file to run. [Contact us](https://support.smartbear.com/pactflow/message/) if you have not
received one when your account was setup. See the [section on licenses for installation instructions](/docs/on-premises/license).
