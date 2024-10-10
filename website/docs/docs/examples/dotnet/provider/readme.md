---
custom_edit_url: https://github.com/pactflow/example-provider-dotnet/edit/master/README.md
title: Example Provider Dotnet
sidebar_label: Example Provider Dotnet
---

<!-- This file has been synced from the pactflow/example-provider-dotnet repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-provider-dotnet


[![Build](https://github.com/pactflow/example-provider-dotnet/actions/workflows/build.yml/badge)](https://github.com/pactflow/example-provider-dotnet/actions/workflows/build.yml)

![Can I Deploy](https://testdemo.pactflow.io/pacticipants/pactflow-example-provider-dotnet/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-dotnet/consumer/pactflow-example-consumer-dotnet/latest/badge) (latest)

![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-dotnet/consumer/pactflow-example-consumer-dotnet/latest/prod/badge) (prod)

This is an example of a .NET 8 provider that uses Pact, [PactFlow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

The latest version of the Example Consumer/Example Provider pact is published [here](https://test.pactflow.io/pacts/provider/pactflow-example-provider-dotnet/consumer/pactflow-example-consumer/latest).

## Project Phases

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

* Test
  * Run tests (including the pact tests that generate the contract)
  * Publish pacts, tagging the consumer version with the name of the current branch
  * Check if we are safe to deploy to prod (ie. has the pact content been successfully verified)
* Deploy (only from master)
  * Deploy app (just pretend for the purposes of this example!)
  * Tag the deployed consumer version as 'prod'

## Dependencies

* Docker
* A [PactFlow](https://pactflow.io) account
* A [read/write API Token](https://docs.pactflow.io/#configuring-your-api-token) from your PactFlow account
* .NET 8.x installed. Installation instructions can be found here: <https://learn.microsoft.com/en-us/dotnet/core/install/>

## Usage

See the [PactFlow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop).

The below commands are designed for a Linux/OSX environment, please translate for use on Windows/PowerShell as necessary:

Please ensure the following environment variables have been exported in the process that you run the tests (generally a terminal):

```bash
export PACT_BROKER_TOKEN=<your pactflow read/write token here>
export PACT_BROKER_BASE_URL=https://<your pactflow subdomain>.pactflow.io
```

### Simulating CI

Usually, you would integrate this into a real CI system (such as Buildkite/Jenkins/CircleCI etc., or Travis as this repository is built against).

You can simulate a CI process with the following command:

```bash
make fake_ci
```
