---
custom_edit_url: https://github.com/pactflow/example-bi-directional-consumer-wiremock/edit/master/README.md
title: Example Java Consumer - Wiremock (BYO Adapter)
sidebar_label: Example Java Consumer - Wiremock (BYO Adapter)
---

<!-- This file has been synced from the pactflow/example-bi-directional-consumer-wiremock repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-bi-directional-consumer-wiremock


<!-- Build Badge -->

[![Build](https://github.com/pactflow/example-consumer-wiremock/workflows/Build/badge.svg)](https://github.com/pactflow/example-consumer-wiremock/actions/workflows/build.yml)

<!-- Can I Deploy Badge -->

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-consumer-wiremock/branches/master/latest-version/can-i-deploy/to-environment/production/badge)](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-consumer-wiremock/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

- [Example Java Consumer - Wiremock (BYO Adapter)](#example-java-consumer---wiremock-byo-adapter)
  - [Overview of Example](#overview-of-example)
  - [Overview of Part of Bi-Directional Contract Testing Flow](#overview-of-part-of-bi-directional-contract-testing-flow)
  - [Compatible with Providers](#compatible-with-providers)
  - [Pre-requisites](#pre-requisites)
    - [Environment variables](#environment-variables)
  - [Usage](#usage)
    - [Steps](#steps)
  - [OS/Platform specific considerations](#osplatform-specific-considerations)
    - [Windows](#windows)
  - [Caveats](#caveats)
  - [Related topics / posts / discussions](#related-topics--posts--discussions)
  - [Other examples of how to do this form of testing](#other-examples-of-how-to-do-this-form-of-testing)
  - [Found an issue?](#found-an-issue)

## Overview of Example

<!-- Consumer Overview -->

This is an example of a Java "Product" API consumer that uses Wiremock, Pact, [PactFlow](https://pactflow.io) and GitHub Actions to generate and publish Pact consumer contracts.

It performs pre-deployment cross-compatibility checks to ensure that it is compatible with specified providers using the Bi-Directional contract capability of PactFlow.

<!-- General -->

See the full [PactFlow Bi-Directional Workshop](https://docs.pactflow.io/docs/workshops/bi-directional-contract-testing) for which this can be substituted in as the "consumer".


## Overview of Part of Bi-Directional Contract Testing Flow

<!-- Consumer Overview -->

In the following diagram, You can see how the consumer testing process works - it's the same as the current Pact process.

When we call "can-i-deploy" the cross-contract validation process kicks off on PactFlow, to ensure any consumer consumes a valid subset of the OAS for the provider.

![Consumer Test](https://raw.githubusercontent.com/pactflow/example-bi-directional-consumer-wiremock/master/docs/consumer-scope.png)

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

* Test
  * Run tests (including the pact tests that generate the contract)
  * Publish pacts, tagging the consumer version with the name of the current branch
  * Check if we are safe to deploy to Production with `can-i-deploy` (ie. has the cross-contract validation has been successfully performed)
* Deploy (only from master)
  * Deploy app to Production
  * Record the Production deployment in the Pact Broker

![Consumer Pipeline](https://raw.githubusercontent.com/pactflow/example-bi-directional-consumer-wiremock/master/docs./../docs/consumer-pipeline.png)

## Compatible with Providers

<!-- Provider Compatability -->

This project is currently compatible with the following provider(s):

* [pactflow-example-bi-directional-provider-dredd](https://github.com/pactflow/example-bi-directional-provider-dredd)
* [pactflow-example-bi-directional-provider-restassured](https://github.com/pactflow/example-provider-restassured)
* [pactflow-example-bi-directional-provider-postman](https://github.com/pactflow/example-bi-directional-provider-postman)

See [Environment variables](#environment-variables) on how to set these up.
  
## Pre-requisites

**Software**:

- Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
- A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)

### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

- `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for PactFlow
- `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io

<!-- CONSUMER env vars -->

Set `PACT_PROVIDER` to one of the following

- `PACT_PROVIDER=pactflow-example-bi-directional-provider-dredd`: Dredd - (https://github.com/pactflow/example-bi-directional-provider-dredd)
- `PACT_PROVIDER=pactflow-example-bi-directional-provider-postman`: Postman - (https://github.com/pactflow/example-bi-directional-provider-postman)
- `PACT_PROVIDER=pactflow-example-bi-directional-provider-restassured`:  Rest Assured - (https://github.com/pactflow/example-bi-directional-provider-restassured)

NOTE:- It defaults to `pactflow-example-bi-directional-provider-restassured` for compatibility with the [Java RestAssured](https://github.com/pactflow/example-bi-directional-provider-restassured) provider
  
## Usage

### Steps

* `make test` - run the tests locally
* `make fake_ci` - run the CI process, but locally

## OS/Platform specific considerations

The makefile is configured to run on Unix based systems such as you would find in most common CI/CD pipelines. 

They can be run locally on Unix/Mac, or on Windows via [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install). 

### Windows 

You can still try this example locally on Windows using powershell and running commands manually. 

<details>
  <summary>Click to see windows specific instructions here</summary>


  These will be the same commands that are used in the makefile with a few manual tweaks.

1. Make sure you have set all of the environment variables, in powershell they can be set like so.

    ```
     $env:GIT_BRANCH="main"
    ```

  1. Publish the pact that was generated. The step uses the pact-cli docker image to publish the pact to your pactflow account.
  The path for `<path_to_project_root>` needs to be converted from Windows paths to UNIX ones as the Docker container is using UNIX. Either hard code this or set it as another environment variable.

      `C:\Users\Person\Documents\example-bi-directional-consumer-dotnet` 
      
      becomes
      
      `/c/Users/Candy/Documents/PactFlow/example-bi-directional-consumer-dotnet`

      $env:VARIABLE_NAME refers to the environment variables in windows.

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli publish <path_to_pacts_folder> --consumer-app-version $env:GIT_COMMIT --branch $env:GIT_BRANCH

      ```

  4. Check can-i-deploy to see if your provider is compatible with your pact.

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli  broker can-i-deploy --pacticipant pactflow-example-bi-directional-consumer-dotnet --version $env:GIT_COMMIT --to-environment production  --retry-while-unknown 0 --retry-interval 10
      ```

5. Have a look at what other commands are available in the Makefile. All of them can be ran locally from Powershell by changing the windows paths to UNIX and replacing the environment variable references. Any variable referenced as `${VARIABLE}` can be changed to `$env:VARIABLE` to reference environment variables in Powershell.

</details>


## Caveats

- [OAS considerations](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas#considerations)

## Related topics / posts / discussions

- [Consumer Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/consumer)
- [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider)

## Other examples of how to do this form of testing

- TBC

## Found an issue?

Reach out via a GitHub Issue, or reach us over in the [Pact foundation Slack](https://slack.pact.io)
