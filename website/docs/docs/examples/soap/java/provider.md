---
custom_edit_url: https://github.com/pactflow/example-provider-java-soap/edit/master/README.md
title: Example Java XML Provider
sidebar_label: Example Java XML Provider
---

<!-- This file has been synced from the pactflow/example-provider-java-soap repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-provider-java-soap


[![Build Status](https://travis-ci.com/pactflow/example-provider-java-soap.svg?branch=master)](https://travis-ci.com/pactflow/example-provider-java-soap)

This is an example of a Java XML provider that uses Pact, [Pactflow](https://pactflow.io) and Travis CI to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

## Pact verifications

When using Pact in a CI/CD pipeline, there are two reasons for a pact verification task to take place:

   * When the provider changes (to make sure it does not break any existing consumer expectations)
   * When a pact changes (to see if the provider is compatible with the new expectations)

When the provider changes, the pact verification task runs as part the provider's normal build pipeline, generally after the unit tests, and before any deployment takes place. This pact verification task is configured to dynamically fetch all the relevant pacts for the specified provider from Pactflow, verify them, and publish the results back to Pactflow.

To ensure that a verification is also run whenever a pact changes, we create a webhook in Pactflow that triggers a provider build, and passes in the URL of the changed pact. Ideally, this would be a completely separate build from your normal provider pipeline, and it should just verify the changed pact.

Because Travis CI only allows us to have one build configuration per repository, we switch between the main pipeline mode and the webhook-triggered mode based on the presence of an environment variable that is only set via the webhook. Keep in mind that this is just a constraint of the tools we're using for this example, and is not necessarily the way you would implement Pact your own pipeline.

## Usage

You will need Pactflow credentials to run the examples and have them exported into your environment.

```
export PACT_BROKER_TOKEN=<your token>
export PACT_BROKER_BASE_URL=https://dius.pactflow.io
export PACT_BROKER_HOST=dius.pactflow.io

make test # runs the local tests
make fake_ci # pretends to show what you would do in a CI/CD through Travis
```

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop) for further details.
