---
custom_edit_url: https://github.com/pactflow/example-provider-golang/edit/master/README.md
title: Example Provider
sidebar_label: Example Provider
---

<!-- This file has been synced from the pactflow/example-provider-golang repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-provider-golang


![Build](https://github.com/pactflow/example-provider-golang/workflows/Build/badge.svg)

[![Can I deploy Status](https://test.pactflow.io/pacticipants/pactflow-example-provider-golang/branches/master/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://test.pactflow.io/overview/provider/pactflow-example-consumer-golang/consumer/pactflow-example-consumer-golang)

[![Pact Status](https://test.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest/badge.svg)](https://test.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest) (latest pact)

[![Pact Status](https://test.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest/master/badge.svg)](https://test.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer-golang/latest/master) (master/master pact) 
This is an example of a (Gin-based) Golang provider that uses Pact, [Pactflow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

It is using a public tenant on Pactflow, which you can access [here](https://test.pactflow.io) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`. The latest version of the Example Consumer/Example Provider pact is published [here](https://test.pactflow.io/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer/latest).

## Pre-Requisites

Ruby standalone binaries must be installed, the following script will download them and add them to your system PATH

```
make install_ruby_standalone
```

## Usage

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop).

```
make fake_ci
```
