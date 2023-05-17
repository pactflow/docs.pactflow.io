---
custom_edit_url: https://github.com/pactflow/example-bi-directional-provider-dotnet/edit/main/README.md
title: Example .NET Provider - Schemathesis
sidebar_label: Example .NET Provider - Schemathesis
---

<!-- This file has been synced from the pactflow/example-bi-directional-provider-dotnet repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-bi-directional-provider-dotnet


<!-- Build Badge -->

[![Build Status](https://github.com/pactflow/example-bi-directional-provider-dotnet/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-bi-directional-provider-dotnet/actions)

<!-- Can I Deploy Badge -->

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-provider-dotnet/branches/main/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-provider-dotnet/branches/main/latest-version/can-i-deploy/to-environment/production/badge)

- [Example .NET Provider - Schemathesis](#example-net-provider---schemathesis)
  - [Overview of Example](#overview-of-example)
  - [Overview of Part of Bi-Directional Contract Testing Flow](#overview-of-part-of-bi-directional-contract-testing-flow)
  - [Compatibile with Consumers](#compatibile-with-consumers)
  - [Pre-requisites](#pre-requisites)
    - [Environment variables](#environment-variables)
  - [Usage](#usage)
    - [Steps](#steps)
    - [Use case with Schemathesis](#use-case-with-schemathesis)
  - [OS/Platform specific considerations](#osplatform-specific-considerations)
    - [Windows](#windows)
  - [Caveats](#caveats)
  - [Related topics / posts / discussions](#related-topics--posts--discussions)
  - [Found an issue?](#found-an-issue)

## Overview of Example

<!-- Provider Overview -->

This is an example of a .NET "Product" API Provider that uses Schemathesis, Pact, [PactFlow](https://pactflow.io) and GitHub Actions to generate and publish Pact provider contracts.

It performs pre-deployment cross-compatability checks to ensure that it is compatible with specified consumers using the Bi-Directional contract capability of PactFlow.

<!-- General -->

See the full [PactFlow Bi-Directional Workshop](https://docs.pactflow.io/docs/workshops/bi-directional-contract-testing) for which this can be substituted in as the "provider".

## Overview of Part of Bi-Directional Contract Testing Flow

<!-- Provider Overview -->

In the following diagram, you can see how the provider testing process works.

When we call "can-i-deploy" the cross-contract validation process kicks off on PactFlow, to ensure any consumer consumes a valid subset of the OAS for the provider.

![Provider Test](https://raw.githubusercontent.com/pactflow/example-bi-directional-provider-dotnet/main/docs/provider-scope.png)

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

* Test
  * Run tests to check spec compliance with openAPI spec
  * Create branch tag via Pact CLI
  * Publish openAPI spec, along with a version with the name of the current branch
  * Check if we are safe to deploy to Production with `can-i-deploy` (ie. has the cross-contract validation has been successfully performed)
* Deploy (only from <main|master>)
  * Deploy app to Production
  * Record the Production deployment in the Pact Broker

![Provider Pipeline](https://raw.githubusercontent.com/pactflow/example-bi-directional-provider-dotnet/main/docs/provider-pipeline.png)


## Compatibile with Consumers

<!-- Consumer Compatability -->

This project is currently compatible with the following consumers(s):

<!-- * [pactflow-example-bi-directional-consumer-nock](https://github.com/pactflow/example-bi-directional-consumer-nock)
* [pactflow-example-bi-directional-consumer-msw](https://github.com/pactflow/example-bi-directional-consumer-msw)
* [pactflow-example-bi-directional-consumer-wiremock](https://github.com/pactflow/example-bi-directional-consumer-wiremock)
* [pactflow-example-bi-directional-consumer-mountebank](https://github.com/pactflow/example-bi-directional-consumer-mountebank) -->
* [pactflow-example-bi-directional-consumer-dotnet](https://github.com/pactflow/example-bi-directional-consumer-dotnet)

<!-- See [Environment variables](#environment-variables) on how to set these up -->

  
## Pre-requisites

**Software**:

- Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
- A pactflow.io account with an valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)

### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

- `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for PactFlow
- `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io
  
## Usage

### Steps

  1. Make sure you have completed the pre-requisite steps of setting up your PactFlow account, and setting the environment variables `PACT_BROKER_TOKEN` and `PACT_BROKER_BASE_URL` with the token and URL from your PactFlow account. These environment variables are what is used in the Makefile simulated build pipeline process to determine which PactFlow instance to publish to.

  2. Generate the dll for the project, this is the binary file that would be deployed to an environment. This step generates the Swagger doc for the project, which will be uploaded to PactFlow. Run the following command in the terminal on the root of the project:

      `make publish_dll`

  3. Use Schemathesis to verify that the API endpoints match the generated Swagger doc by running the verify_swagger target. This will generate a a Schemathesis report documenting the compatibility of the endpoints with the Swagger doc

      `make verify_swagger`

  4. If the Schemathasis test is successful run the publish_success target, this will publish the Swagger document, Schemathesis report, and success status of the verification to your PactFlow account

      `EXIT_CODE=0 make publish_provider_contract`

### Use case with Schemathesis

_note_ - Make sure you have built the .dll first with `make publish_dll`

* `make test` - run the tests locally
* `make fake_ci` - run the CI process (the above steps) locally, this will publish the Swagger document and Schemathesis report to PactFlow.

## OS/Platform specific considerations

The makefile is configured to run on Unix based systems such as you would find in most common CI/CD pipelines. 

They can be run locally on Unix/Mac, or on Windows via [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install). 

### Windows 

To run this example on Windows, we will use Powershell and run the commands defined in the Makefile, manually.

We will take you through the steps, but you can see the commands in the `./Makefile`

Some notes:

* Most of them use the pact-cli docker image
* Can be ran locally from Powershell by changing the unix paths to windows paths
* Replace the environment variable references. Any variable referenced as ${VARIABLE} can be changed to $env:VARIABLE for use in Powershell.

<details>
  <summary>Click to see windows specific instructions here</summary>


  1. Publish the example in Visual Studio, or by using the dotnet CLI to run `dotnet publish` in the same directory as the example solution. This will generate a .dll and also generates the swagger doc.

  2. Next we can use Schemathesis to test the API against our generated swagger doc. Start the example project in Visual Studio or via dotnet cli from the project root:

      ```
      dotnet run --project .\example-bi-directional-provider-dotnet
      ```
      In powershell in the root directory (you'll need a new window if you are using dotnet CLI to run the app) use docker run to perform the Schemathesis test. This will check the API implements the swagger doc accurately and output the results to report.txt. Once this is generated the API can be shut down again

      ```
      docker run --net="host" schemathesis/schemathesis:stable run --stateful=links --checks all http://host.docker.internal:9000/swagger/v1/swagger.json > report.txt
      ```

  3. Now that the Swagger doc is generated and verified the contract can be published to PactFlow. The easiest way to do this via windows is using our standalone tools. See [here](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow) for cross platform instructions.

  4. Check can-i-deploy to see if your provider contract is compatible with current consumers. 
   
   In Powershell 
   
   * set the environment variable $env:PACTICIPANT to the name of the provider in the url for step 3.
   
  5. Set the environment variable $env:GIT_COMMIT to the same thing as in step 3.

      This tells pactflow which provider contract and version to perform the can-i-deploy check on.
      
       Run the can-i-deploy check using the pact-cli docker container:

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli broker can-i-deploy --pacticipant $env:PACTICIPANT --version $env:GIT_COMMIT --to-environment production
      ```

</details>


## Caveats

- [OAS considerations](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas#considerations)

## Related topics / posts / discussions

- [Consumer Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/consumer)
- [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider)

## Found an issue?

Reach out via a GitHub Issue, or reach us over in the [Pact foundation Slack](https://slack.pact.io)
