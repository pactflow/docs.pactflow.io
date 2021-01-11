---
custom_edit_url: https://github.com/pactflow/example-provider-golang/edit/master/README.md
title: Example Provider
sidebar_label: Example Provider
---

<!-- This file has been synced from the pactflow/example-provider-golang repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-provider-golang


[![Build Status](https://travis-ci.com/pactflow/example-provider-golang.svg?branch=master)](https://travis-ci.com/pactflow/example-provider-golang)

This is an example of a (Gin-based) Golang provider that uses Pact, [Pactflow](https://pactflow.io) and Travis CI to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

It is using a public tenant on Pactflow, which you can access [here](https://test.pact.dius.com.au) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`. The latest version of the Example Consumer/Example Provider pact is published [here](https://test.pact.dius.com.au/pacts/provider/pactflow-example-provider-golang/consumer/pactflow-example-consumer/latest).

## Usage

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop).

```
make fake_ci
```
