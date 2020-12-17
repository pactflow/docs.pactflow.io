---
custom_edit_url: https://github.com/pactflow/example-consumer-java-junit/edit/master/README.md
title: Example Java XML Consumer
sidebar_label: Example Java XML Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-java-junit repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-java-junit


[![Build Status](https://travis-ci.com/pactflow/example-consumer-java-junit.svg?branch=master)](https://travis-ci.com/pactflow/example-consumer-java-junit)

This is an example of a Java JSON consumer that uses Pact, [Pactflow](https://pactflow.io) and Travis CI to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

See the canonical consumer example here: https://github.com/pactflow/example-consumer
See also the full [Pactflow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

## Pre-requisites

**Software**:

https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/

## Usage

```sh
make test
```
