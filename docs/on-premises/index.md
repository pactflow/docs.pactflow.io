---
title: Pactflow On-Premises Architecture
sidebar_label: Architecture
---

## System architecture

### Example AWS architecture

![System architecture](/img/SaaS%20Architecture.png)


### Minimum requirements

* An application server capable of running Docker
* Postgres database
* SAML IDP for SSO

### Recommended architecture

* Deploy to a service designed for managing Docker containers (ECR, Fargate, Kubernetes etc.)

## Internal architecture

The Pactflow On-Premises application is distributed as a Docker image. It is based on the open source [Pact Broker](https://github.com/pact-foundation/pact_broker), which is a Ruby application.
