---
id: ci-cd-legacy
title: Consumer-Driven Contract Testing CI/CD Workshop (Legacy)
sidebar_label: Introduction
---

A workshop demonstrating how to set up a CI/CD pipeline for a consumer and provider using Pact, Pactflow and Github Actions.

It uses the Pactflow [example-consumer-legacy][example-consumer-legacy] and [example-provider-legacy][example-provider-legacy] repositories. These are written in Node, however, extensive node experience will not be required for the workshop.

## Goals

* To understand how Pact and Pactflow fit into the CI/CD pipelines of a consumer and provider.
* To understand the workflows involved in making changes to both consumer and provider.
* To understand how Pact + Pactflow stop breaking changes from being deployed to a given environment.

[example-consumer-legacy]: https://github.com/pactflow/example-consumer-legacy
[example-provider-legacy]: https://github.com/pactflow/example-provider-legacy

:::info

This workshop uses the outdated method of recording releases usings [tags](https://docs.pact.io/pact_broker/tags#using-tags).

The [recommended workflow](https://docs.pactflow.io/docs/workshops/ci-cd) uses [`branches`](https://docs.pact.io/pact_broker/branches) & [`record-deployment`](https://docs.pact.io/pact_broker/recording_deployments_and_releases) first-class features of Pact/Pactflow and uses features not available with [tags](https://docs.pact.io/pact_broker/tags#using-tags) .

All of the major Pact client libraries have support, and a full support matrix can be shown [here](https://docs.pact.io/pact_broker/branches#support).

If you are not using one of the libraries that currently supported, we would recommend running through the [new workshop](https://docs.pactflow.io/docs/workshops/ci-cd) regardless, as it will showcase advanced features of Pact.

If you are still using `tags` and need more of a reason to switch, have a read of these posts

* <https://docs.pact.io/blog/2021/10/11/contract-requiring-verification-published-webhook-event>
* <https://docs.pact.io/blog/2021/07/04/why-we-are-getting-rid-of-tags>

:::
