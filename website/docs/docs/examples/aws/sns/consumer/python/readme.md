---
custom_edit_url: https://github.com/pactflow/example-consumer-python-sns/edit/main/README.md
title: Example Python AWS SNS Consumer
sidebar_label: Example Python AWS SNS Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-python-sns repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-python-sns


[![Build Status](https://github.com/pactflow/example-consumer-python-sns/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-consumer-python-sns/actions)

[![Can I deploy Status](https://test.pactflow.io/pacticipants/pactflow-example-consumer-python-sns/branches/main/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://test.pactflow.io/pacticipants/pactflow-example-consumer-python-sns/branches/main/latest-version/can-i-deploy/to-environment/production/badge)

[![Pact Status](https://test.pactflow.io/pacts/provider/pactflow-example-provider-python-sns/consumer/pactflow-example-consumer-python-sns/latest/badge.svg?label=consumer)](https://test.pactflow.io/pacts/provider/pactflow-example-provider-python-sns/consumer/pactflow-example-consumer-python-sns/latest) (latest pact)

[![Pact Status](https://test.pactflow.io/matrix/provider/pactflow-example-provider-python-sns/latest/main/consumer/pactflow-example-consumer-python-sns/latest/main/badge.svg?label=consumer)](https://test.pactflow.io/pacts/provider/pactflow-example-provider-python-sns/consumer/pactflow-example-consumer-python-sns/latest/prod) (prod/prod pact)

This is an example of a Python AWS SNS consumer that uses Pact, [Pactflow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

All examples in the series `example-consumer-<language>-sns` provide the same functionality to be easily comparable across languages.
As such, please refer to [https://docs.pactflow.io/docs/examples/aws/sns/consumer/](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/AWS) to avoid unnecessary duplication of details here.

Language specific sections which differ from the canonical example only can be found below.

### How to write tests?

We recommend that you split the code that is responsible for handling the protocol specific things - in this case the lambda and SNS input - and the piece of code that actually handles the payload.

You're probably familiar with layered architectures such as Ports and Adaptors (also referred to as a Hexagonal architecture). Following a modular architecture will allow you to do this much more easily:

![Code Modularity](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/docs/ports-and-adapters.png)

This code base is setup with this modularity in mind:

- [Lambda Handler](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/src/_lambda/product.py)
- [Event Service](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/src/product/product_service.py)
- Business Logic
  - [Product](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/src/product/product.py)
  - [Repository](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/src/product/product_repository.py)

The target of our [consumer pact test](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/tests/unit/product_service_pact_test.py) is the [Event Service](https://raw.githubusercontent.com/pactflow/example-consumer-python-sns/main/src/product/product_service.py), which is responsible for consuming a Product update event, and persisting it to a database (the Repository).

See also:

- https://dius.com.au/2017/09/22/contract-testing-serverless-and-asynchronous-applications/
- https://dius.com.au/2018/10/01/contract-testing-serverless-and-asynchronous-applications---part-2/

## Usage

### Testing

- Run the unit tests: `make test`
- Run a (local) lambda integration test: `make integration`
