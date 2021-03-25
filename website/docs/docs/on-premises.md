---
title: Pactflow On-Premises Architecture
sidebar_label: Architecture
---

## System architecture

### Minimum requirements

* An application server capable of running Docker
* PostgreSQL database
* SAML IDP for SSO
* Pactflow license file (versions 1.10.0+)

### Recommended architecture

* Deploy to a service designed for Docker container orchestration (ECS, Fargate, Kubernetes etc.)

### Example AWS deployment using ECS

![System architecture](/img/saas-architecture-aws.png)

## Internal architecture

The Pactflow On-Premises application is distributed as a Docker image. It is based on the open source [Pact Broker](https://github.com/pact-foundation/pact_broker), which is a Ruby application.

### Application user requirements

The Pactflow application does not need any elevated privileges to run. It runs under the user `app:app`.

### Application port

The Pactflow application runs on port `9292` by default. This can be configured by setting the [PACTFLOW_HTTP_PORT](/docs/on-premises/environment-variables#pactflow_http_port) environment variable.

### Healthcheck endpoint

A healthcheck endpoint for use by a Docker container managment service is available at `http://<HOST>/diagnostic/status/heartbeat`. No authentication is required. This endpoint does not make a connection to the database.

To check the connection to the database, use the endpoint `/diagnostic/status/dependencies`. This endpoint should not be used by Docker container managment services, as unrelated database issues might cause the Docker container to churn.

### License file (versions 1.10.0+)

Pactflow on-premises version requires a license file to run. Contract us at support@pactflow.io if you have not
recieved one when your account was setup. See [License file](/docs/on-premises/license).
