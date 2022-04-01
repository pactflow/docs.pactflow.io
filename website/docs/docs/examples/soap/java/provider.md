---
custom_edit_url: https://github.com/pactflow/example-provider-java-soap/edit/master/README.md
title: Example Java XML Provider
sidebar_label: Example Java XML Provider
---

<!-- This file has been synced from the pactflow/example-provider-java-soap repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-provider-java-soap


![Build](https://github.com/pactflow/example-provider-java-soap/workflows/Build/badge.svg)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-provider-java-soap/branches/master/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://testdemo.pactflow.io/overview/provider/pactflow-example-provider-java-soap/consumer/pactflow-example-consumer-soap)

[![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-soap/consumer/pactflow-example-consumer-java-soap/latest/badge.svg)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-soap/consumer/pactflow-example-consumer-java-soap/latest) (latest pact)

[![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-soap/consumer/pactflow-example-consumer-java-soap/latest/master/badge.svg)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-java-soap/consumer/pactflow-example-consumer-java-soap/latest/master) (master/master pact)


This is an example of a Java XML provider that uses Pact, [Pactflow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

## Pact verifications

When using Pact in a CI/CD pipeline, there are two reasons for a pact verification task to take place:

   * When the provider changes (to make sure it does not break any existing consumer expectations)
   * When a pact changes (to see if the provider is compatible with the new expectations)

When the provider changes, the pact verification task runs as part the provider's normal build pipeline, generally after the unit tests, and before any deployment takes place. This pact verification task is configured to dynamically fetch all the relevant pacts for the specified provider from Pactflow, verify them, and publish the results back to Pactflow.

To ensure that a verification is also run whenever a pact changes, we create a webhook in Pactflow that triggers a provider build, and passes in the URL of the changed pact. Ideally, this would be a completely separate build from your normal provider pipeline, and it should just verify the changed pact.

Because GitHub Actions only allows us to have one build configuration per repository, we switch between the main pipeline mode and the webhook-triggered mode based on the presence of an environment variable that is only set via the webhook. Keep in mind that this is just a constraint of the tools we're using for this example, and is not necessarily the way you would implement Pact your own pipeline.

## Usage

You will need Pactflow credentials to run the examples and have them exported into your environment.

```
export PACT_BROKER_TOKEN=<your token>
export PACT_BROKER_BASE_URL=https://dius.pactflow.io
export PACT_BROKER_HOST=dius.pactflow.io

make test # runs the local tests
make fake_ci # pretends to show what you would do in a CI/CD through GitHub Actions
```

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop) for further details.
