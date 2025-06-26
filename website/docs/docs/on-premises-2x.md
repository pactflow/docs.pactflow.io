---
title: PactFlow On-Premises Architecture
sidebar_label: Architecture
---

## System architecture

### Minimum requirements

* An application server capable of running Docker
* PostgreSQL database
* Redis Serialization Protocol (RESP)-compatible key/value cache
* SAML IDP for SSO
* PactFlow license file

### Recommended architecture

* Deploy to a service designed for Docker container orchestration (ECS, Fargate, Kubernetes etc.)

### Example AWS deployment using ECS

![System architecture](/img/on-prem-architecture-2x.png)

## Internal architecture

The PactFlow On-Premises application is distributed as a Docker image. It is based on the open source [Pact Broker](https://github.com/pact-foundation/pact_broker), which is a Ruby application.

### Application user requirements

You can run the application without elevated privileges. It runs under the user `app`.

### Application port

The PactFlow application runs on port `9292` by default. This can be configured by setting the [PACTFLOW_HTTP_PORT](/docs/on-premises/environment-variables#pactflow_http_port) environment variable.

### Healthcheck endpoint

There's a healthcheck endpoint at `http://<HOST>/diagnostic/status/heartbeat` meant for Docker container management tools.

- It doesn't need authentication.
- It doesn't touch the database.
- You can use it to check if load balancer targets are working properly.

If you're running the healthcheck from inside the container, be sure to use the port specified by the `$PACTFLOW_HTTP_PORT` environment variable (defaults to `9292` if not set).

You can use `supervisorctl` to send the healthcheck request.

An example healthcheck configuration for Docker Compose:

```yaml
healthcheck:
  test: ["supervisorctl", "status", "haproxy", "marko", "pactflow"]
  interval: 30s
  timeout: 10s
  retries: 3
```

To check the connection to the database, use the endpoint `/diagnostic/status/dependencies`. This endpoint should not be used by Docker container managment services, as unrelated database issues might cause the Docker container to churn.

### License file

PactFlow on-premises version requires a license file to run. [Contact us](https://support.smartbear.com/pactflow/message/) if you have not
received one when your account was setup. See the [section on licenses for installation instructions](/docs/on-premises/license).
