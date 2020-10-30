---
custom_edit_url: https://github.com/pactflow/example-consumer-java-kafka/edit/master/README.md
title: Example Java Kafka Consumer
sidebar_label: Example Java Kafka Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-java-kafka repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-java-kafka


[![Build Status](https://travis-ci.com/pactflow/example-consumer-java-kafka.svg?branch=master)](https://travis-ci.com/pactflow/example-consumer-java-kafka)

This is an example of a Java kafka consumer that uses Pact, [Pactflow](https://pactflow.io) and Travis CI to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

See the canonical consumer example here: https://github.com/pactflow/example-consumer
See also the full [Pactflow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

In the following diagram, we'll be testing the "Product API", a simple HTTP service that exposes product information as a REST API, which is fed events from an Event API on the `product` topic.

![Kafka Architecture](https://raw.githubusercontent.com/pactflow/example-consumer-java-kafka/master/docs/kafka.png)

## Pre-requisites

**Software**:

https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/

## Usage

* Running the API locally: `make start`
* Producing test events into the `product` topic: `make test-events`
* Retrieve latest products: `curl localhost:8080/products`
