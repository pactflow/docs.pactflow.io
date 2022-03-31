---
custom_edit_url: https://github.com/pactflow/example-bi-directional-consumer-dotnet/edit/main/README.md
title: Example .NET Pact Consumer
sidebar_label: Example .NET Pact Consumer
---

<!-- This file has been synced from the pactflow/example-bi-directional-consumer-dotnet repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-bi-directional-consumer-dotnet


[![Build](https://github.com/pactflow/example-bi-directional-consumer-dotnet/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-bi-directional-consumer-dotnet/actions/workflows/build.yml)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-provider-dotnet/branches/main/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-provider-dotnet/branches/main/latest-version/can-i-deploy/to-environment/production/badge)


This is an example of a .NET consumer using Pact to create a consumer driven contract, and sharing it via [Pactflow](https://pactflow.io).

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

* Test
  * Run tests (including the pact tests that generate the contract)
  * Publish pacts, tagging the consumer version with the name of the current branch
  * Check if we are safe to deploy to prod (ie. has the pact content been successfully verified)
* Deploy (only from main)
  * Deploy app (just pretend for the purposes of this example!)
  * Record the deployment in the Pact Broker

## Usage

This is an example of a .NET consumer using Pact to create a consumer driven contract, and sharing it via [Pactflow](https://pactflow.io).

It implements a "Product" website, to demonstrate the new bi-directional contract capability of Pactflow (previously referred to as Provider driven contracts, or collaborative contracts). See the [Provider](https://github.com/pactflow/example-bi-directional-provider-dotnet) counterpart.

In the following diagram, you can see how the consumer testing process works - it's the same as the current Pact process! (We do show an alternative using Nock's record/replay functionality)

When we call "can-i-deploy" the cross-contract validation process kicks off on Pactflow, to ensure any consumer consumes a valid subset of the OAS for the provider.

See the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop) for more details on setting up Pact testing as part of a CI/CD pipeline.

![Consumer Test](https://raw.githubusercontent.com/pactflow/example-bi-directional-consumer-dotnet/main/docs/consumer-scope.png)

When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

![Consumer Pipeline](https://raw.githubusercontent.com/pactflow/example-bi-directional-consumer-dotnet/main/docs./../docs/consumer-pipeline.png)

### Pre-requisites

**Software**:

* Tools listed at: https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/
* Your pactflow.io account with an valid [API token](https://docs.pactflow.io/#configuring-your-api-token)
* [.NET core 3.1 SDK installed](https://dotnet.microsoft.com/en-us/download/dotnet/3.1), this is the version of .NET core used for this example.
* Docker running on your local machine

**Environment variables**

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

* `GIT_COMMIT`: version of the consumer app, used to publish the pact
* `GIT_BRANCH`: git branch name used to publish a pact for the branch you are working on

* `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/#configuring-your-api-token) for Pactflow
* `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. https://testdemo.pactflow.io
* `PACT_PROVIDER=pactflow-example-provider-dredd`: this changes the default provider to the Dredd based provider (https://github.com/pactflow/example-provider-dredd)
* `PACT_PROVIDER=pactflow-example-provider-postman`: ... Postman (https://github.com/pactflow/example-provider-postman)
* `PACT_PROVIDER=pactflow-example-provider-restassured`: ... Rest Assured (https://github.com/pactflow/example-provider-restassured)
* `PACT_PROVIDER=pactflow-example-bi-directional-provider-dotnet`: ... .NET (https://github.com/pactflow/example-bi-directional-provider-dotnet)

## Test it Out

The makefile is configured to run on Unix based systems such as you would find in most common CI/CD pipelines. They can be run locally on Unix/Mac, or on Windows via [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install). Additionally there is is `GITHUB_WEBHOOK_UUID` variable in the makefile which you can replace with your own to complete the CI/CD tutorial.

* `make test` - run the pact test locally
* `make fake_ci` - run the CI process locally


## Additional Steps for Windows 
You can still try this example locally on Windows using powershell and running commands manually. These will be the same commands that are used in the makefile with a few manual tweaks.

1. Make sure you have set all of the environment variables, in powershell they can be set like so.

    ```
     $env:GIT_BRANCH="main"
    ```
  2. Generate the Pact file for the example by opening the solution and running the tests in visual studio, or using ```dotnet test``` CLI command in the root directory of the project.

  3. Publish the pact that was generated. The step uses the pact-cli docker image to publish the pact to your pactflow account.
  The path for `<path_to_project_root>` needs to be converted from Windows paths to UNIX ones as the Docker container is using UNIX. Either hard code this or set it as another environment variable.

      `C:\Users\Person\Documents\example-bi-directional-consumer-dotnet` 
      
      becomes
      
      `/c/Users/Candy/Documents/Pactflow/example-bi-directional-consumer-dotnet`

      $env:VARIABLE_NAME refers to the environment variables in windows.

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli publish <path_to_pacts_folder> --consumer-app-version $env:GIT_COMMIT --tag $env:GIT_BRANCH

      ```

  4. Check can-i-deploy to see if your provider is compatible with your pact.

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli  broker can-i-deploy --pacticipant pactflow-example-bi-directional-consumer-dotnet --version $env:GIT_COMMIT --to-environment production  --retry-while-unknown 0 --retry-interval 10
      ```

5. Have a look at what other commands are available in the Makefile. All of them can be ran locally from Powershell by changing the windows paths to UNIX and replacing the environment variable references. Any variable referenced as `${VARIABLE}` can be changed to `$env:VARIABLE` to reference environment variables in Powershell.
