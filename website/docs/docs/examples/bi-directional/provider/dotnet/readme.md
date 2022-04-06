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
  - [Other examples of how to do this form of testing](#other-examples-of-how-to-do-this-form-of-testing)
  - [Found an issue?](#found-an-issue)

## Overview of Example

<!-- Provider Overview -->

This is an example of a .NET "Product" API Provider that uses Schemathesis, Pact, [Pactflow](https://pactflow.io) and GitHub Actions to generate and publish Pact provider contracts.

It performs pre-deployment cross-compatability checks to ensure that it is compatible with specified consumers using the Bi-Directional contract capability of Pactflow.

<!-- General -->

See the full [Pactflow Bi-Directional Workshop](https://docs.pactflow.io/docs/workshops/bi-directional-contract-testing) for which this can be substituted in as the "provider".

## Overview of Part of Bi-Directional Contract Testing Flow

<!-- Provider Overview -->

In the following diagram, you can see how the provider testing process works.

When we call "can-i-deploy" the cross-contract validation process kicks off on Pactflow, to ensure any consumer consumes a valid subset of the OAS for the provider.

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

- `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for Pactflow
- `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io
  
## Usage

### Steps

  1. Make sure you have completed the pre-requisite steps of setting up your Pactflow account, and setting the environment variables `PACT_BROKER_TOKEN` and `PACT_BROKER_BASE_URL` with the token and URL from your Pactflow account. These environment variables are what is used in the Makefile simulated build pipeline process to determine which Pactflow instance to publish to.

  2. Generate the dll for the project, this is the binary file that would be deployed to an environment. This step generates the Swagger doc for the project, which will be uploaded to Pactflow. Run the following command in the terminal on the root of the project:

      `make publish_dll`

  3. Use Schemathesis to verify that the API endpoints match the generated Swagger doc by running the verify_swagger target. This will generate a a Schemathesis report documenting the compatibility of the endpoints with the Swagger doc

      `make verify_swagger`

  4. If the Schemathasis test is successful run the publish_contract target, this will publish the Swagger document, Schemathesis report, and success status of the verification to your Pactflow account

      `make publish_contract`

### Use case with Schemathesis

* `make test` - run the tests locally
* `make fake_ci` - run the CI process (the above steps) locally, this will publish the Swagger document and Schemathesis report to Pactflow.

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

  3. Now that the Swagger doc is generated and verified the contract can be published to Pactflow. The easiest way to do this via windows is using postman to make an HTTP PUT request to the Pactflow provider contract API endpoint. First base64 encode the report and swagger docs. This can be done in powershell using the following commands:
      ```
      [convert]::ToBase64String((Get-Content -path "src/example-bi-directional-provider-dotnet/swagger.json" -Encoding byte))
      ```

      ```
      [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content -path "report.txt")))  
      ```
      Open postman and create a new PUT request to the provider contracts endpoint, the git_commit section will be used as the version for the provider contract.

      `https://<your_pactflow_url/contracts/provider/<providerName>/version/<git_commit>`

      In the Authorization section select Bearer Token and add the read/write token from your Pactflow account.
      In the headers tab also set the "content-type" header to "application/json".
      In the body tab select "raw" and "JSON" as the content type.

      The format for the body is as follows, paster in your encoded report and swagger doc content as shown.

      ```
      {
          "content":"<swagger doc encoded content here>",
          "contractType": "oas",
          "contentType": "application/yaml",
          "verificationResults": {
              "success": true,
              "content": "<report.txt encoded content here>",
              "contentType": "text/plain"	,
              "verifier": "Schematheis"
          }

      }
      ```
      Send the request and when you have a 200 response the provider contract will be visible in your Pactflow account.

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

1. TBC

## Related topics / posts / discussions

- TBC

## Other examples of how to do this form of testing

- TBC

## Found an issue?

Reach out via a GitHub Issue, or reach us over in the [Pact foundation Slack](https://slack.pact.io)
