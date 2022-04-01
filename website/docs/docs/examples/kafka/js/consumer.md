---
custom_edit_url: https://github.com/pactflow/example-consumer-js-kafka/edit/master/README.md
title: Example Node Kafka Consumer
sidebar_label: Example Node Kafka Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-js-kafka repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-js-kafka


![Build](https://github.com/pactflow/example-consumer-js-kafka/workflows/Build/badge.svg)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer-js-kafka/branches/master/latest-version/can-i-deploy/to-environment/production/badge)](https://testdemo.pactflow.io/overview/provider/pactflow-example-provider-java-kafka/consumer/pactflow-example-consumer-js-kafka)

[![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-kafka/consumer/pactflow-example-consumer-js-kafka/latest/badge)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-kafka/consumer/pactflow-example-consumer-js-kafka/latest) (latest pact)

[![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-kafka/consumer/pactflow-example-consumer-js-kafka/latest/master/badge.svg)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-kafka/consumer/pactflow-example-consumer-js-kafka/latest/master) (master/master pact)

This is an example of a Node kafka consumer that uses Pact, [Pactflow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

See the canonical consumer example here: https://github.com/pactflow/example-consumer
See also the full [Pactflow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

In the following diagram, we'll be testing the "Product API", a simple HTTP service that exposes product information as a REST API, which is fed events from an Event API on the `product` topic.

![Kafka Architecture](https://raw.githubusercontent.com/pactflow/example-consumer-js-kafka/master/docs/kafka.png)

## Pre-requisites

**Software**:

https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/

## Usage

* Running the API locally: `make start`
* Producing test events into the `product` topic: `make test-events`
* Retrieve latest products: `curl localhost:8080/products`
