---
title: Publishing Contracts
sidebar_label: Publishing Contracts
---

## Publishing the Consumer Contract to PactFlow

Publishing a consumer contract is the same as publishing a regular Pact. For details on publishing pact files to PactFlow, refer to [Sharing Pacts with the Pact Broker](https://docs.pact.io/getting_started/sharing_pacts).

## Publishing the Provider Contract + Results to PactFlow

There are several ways PactFlow can be used to publish contracts.

The links in the list will take you to the respective documentation in each repo.

Otherwise see the [Installation](#installation) section and [Usage](#usage) instructions on this page.

1. [Docker](https://hub.docker.com/r/pactfoundation/pact-cli)
2. [Pact Standalone CLI](https://github.com/pact-foundation/pact-ruby-standalone/releases)
3. [Pact Broker Client (Ruby)](https://github.com/pact-foundation/pact_broker-client#provider-contracts)
4. [Github Actions](https://github.com/pactflow/actions/tree/main/publish-provider-contract)

### Installation

#### Docker

- The Pact Broker CLI is packaged with the other Ruby command line tools in the [pactfoundation/pact-cli](https://hub.docker.com/r/pactfoundation/pact-cli) Docker image.

```sh
docker pull pactfoundation/pact-cli
```

#### Pact Standalone CLI

- Download the latest [pact-ruby-standalone](https://github.com/pact-foundation/pact-ruby-standalone/releases) package.
  - Available from version `v1.89.00` and upwards
- Installation instructions are provided in the above link, for `windows` / `macos` / `linux`
- You do not need Ruby to run the CLI, as the Ruby runtime is packaged with the executable using Travelling Ruby.

##### windows (bash shell)

```sh
 curl -LO https://github.com/pact-foundation/pact-ruby-standalone/releases/download/v1.89.00/pact-1.89.00-win32.zip && \
                unzip pact-1.89.00-win32.zip && \
                ./pact/bin/pactflow.bat help
```

##### MacOS

```sh
curl -LO https://github.com/pact-foundation/pact-ruby-standalone/releases/download/v1.89.00/pact-1.89.00-osx.tar.gz && \
                tar xzf pact-1.89.00-osx.tar.gz && \
                ./pact/bin/pactflow help
```

##### Linux

```sh
curl -LO https://github.com/pact-foundation/pact-ruby-standalone/releases/download/v1.89.00/pact-1.89.00-linux-x86_64.tar.gz && \
                tar xzf pact-1.89.00-linux-x86_64.tar.gz && \
                ./pact/bin/pactflow help
```

#### Pact Broker Client (Ruby)

- Either
  - Add `gem 'pact_broker-client'` to your Gemfile and run `bundle install`
  - Install the gem directly by running
    ```sh
      gem install pact_broker-client
    ```

#### GitHub Actions

Copy and paste the following snippet into your .yml file.

```sh
- name: publish-provider-contract action
  uses: pactflow/actions/publish-provider-contract@v0.0.2
```

### Publishing

#### Usage

```sh
Usage:
  pactflow publish-provider-contract CONTRACT_FILE ... --provider=PROVIDER -a,
    --provider-app-version=PROVIDER_APP_VERSION -b, --broker-base-url=BROKER_BASE_URL

Options:
      --provider=PROVIDER
              # The provider name
  -a, --provider-app-version=PROVIDER_APP_VERSION
              # The provider application version
  -h, [--branch=BRANCH]
              # Repository branch of the provider version
  -t, [--tag=TAG]
              # Tag name for provider version. Can be specified multiple
                times.
      [--specification=SPECIFICATION]
              # The contract specification
              # Default: oas
      [--content-type=CONTENT_TYPE]
              # The content type. eg. application/yml
      [--verification-success], [--no-verification-success]
              # Whether or not the self verification passed successfully.
      [--verification-exit-code=N]
              # The exit code of the verification process. Can be used instead
                of --verification-success|--no-verification-success for a
                simpler build script.
      [--verification-results=VERIFICATION_RESULTS]
              # The path to the file containing the output from the
                verification process
      [--verification-results-content-type=VERIFICATION_RESULTS_CONTENT_TYPE]
              # The content type of the verification output eg. text/plain,
                application/yaml
      [--verification-results-format=VERIFICATION_RESULTS_FORMAT]
              # The format of the verification output eg. junit, text
      [--verifier=VERIFIER]
              # The tool used to verify the provider contract
      [--verifier-version=VERIFIER_VERSION]
              # The version of the tool used to verify the provider contract
      [--build-url=BUILD_URL]
              # The build URL that created the provider contract
  -o, [--output=OUTPUT]
              # json or text
              # Default: text
  -b, --broker-base-url=BROKER_BASE_URL
              # The base URL of the Pact Broker
  -u, [--broker-username=BROKER_USERNAME]
              # Pact Broker basic auth username
  -p, [--broker-password=BROKER_PASSWORD]
              # Pact Broker basic auth password
  -k, [--broker-token=BROKER_TOKEN]
              # Pact Broker bearer token
  -v, [--verbose], [--no-verbose]
              # Verbose output. Default: false
```

#### Docker

- [Docs](https://hub.docker.com/r/pactfoundation/pact-cli)
- [See the example in GitHub Actions](https://github.com/pactflow/example-bi-directional-provider-postman/runs/6819148533?check_suite_focus=true)

```sh
docker run --rm -v /${PWD}:/${PWD} -w ${PWD} \
      -e PACT_BROKER_BASE_URL \
      -e PACT_BROKER_TOKEN \
      pactfoundation/pact-cli:0.50.0.28 \
      pactflow publish-provider-contract \
      oas/swagger.yml \
      --provider "pactflow-example-bi-directional-provider-postman" \
      --provider-app-version 3a0994c \
      --branch test-pactflow-command \
      --content-type application/yaml \
      --verification-exit-code=0 \
      --verification-results newman/newman-run-report-2022-06-09-14-18-33-406-0.json \
      --verification-results-content-type text/plain \
      --verifier postman
```

#### Pact Standalone CLI

- [Docs](https://github.com/pact-foundation/pact-ruby-standalone/releases)
- [See the example in GitHub Actions](https://github.com/pactflow/example-bi-directional-provider-postman/runs/6819148761?check_suite_focus=true)

```sh
./pact/bin/pactflow publish-provider-contract \
      oas/swagger.yml \
      --provider "pactflow-example-bi-directional-provider-postman" \
      --provider-app-version 3a0994c \
      --branch test-pactflow-command \
      --content-type application/yaml \
      --verification-exit-code=0 \
      --verification-results newman/newman-run-report-2022-06-09-14-03-30-715-0.json \
      --verification-results-content-type text/plain \
      --verifier postman
```

#### Pact Broker Client (Ruby)

- [Docs](https://github.com/pact-foundation/pact_broker-client#provider-contracts)
- [See the example in GitHub Actions](https://github.com/pactflow/example-bi-directional-provider-postman/runs/6819148631?check_suite_focus=true)

```sh
pactflow publish-provider-contract \
      oas/swagger.yml \
      --provider "pactflow-example-bi-directional-provider-postman" \
      --provider-app-version 3a0994c \
      --branch test-pactflow-command \
      --content-type application/yaml \
      --verification-exit-code=0 \
      --verification-results newman/newman-run-report-2022-06-09-14-03-30-715-0.json \
      --verification-results-content-type text/plain \
      --verifier postman
```

#### GitHub Actions

- [Docs](https://github.com/pactflow/actions/tree/main/publish-provider-contract#example)
- [See the example in GitHub Actions](https://github.com/pactflow/example-bi-directional-provider-postman/actions/runs/2465589944)

```sh
# (This just saves defining these multiple times for different pact jobs)
env:
  version: "1.2.3"
  application_name: "my-api-provider"
  pact_broker: ${{ secrets.PACT_BROKER_BASE_URL }}
  pact_broker_token: ${{ secrets.PACT_BROKER_TOKEN }}

jobs:
  pact-publish-oas-action:
    steps:
      - uses: actions/checkout@v3 # MANDATORY: Must use 'checkout' first
      - uses: pactflow/actions/publish-provider-contract@v0.0.2
        env:
          oas_file: oas/swagger.yml
          results_file: ${{ env.results_file }}
```

<!-- ### Directly via API

1. `publish_contracts` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/publish-contracts.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L32) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/publish.sh)
 1. This will associate the `version` with a `provider contract`

#### Example

We will take you through an example below.

> The standard authorization environment variables are used here.

Here is an example bash script that uses `cURL` to create the branch version for the specified application to PactFlow.

1. `create_branch_version.sh` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/pacticipant-branch-version.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L26) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/create_branch_version.sh)

```sh
#!/bin/bash

echo "==> Creating version branch for ${PACTICIPANT}"
curl \
-X PUT \
-H "Authorization: Bearer ${PACT_BROKER_TOKEN}" \
-H "Content-Type: application/json" \
"${PACT_BROKER_BASE_URL}/pacticipants/${PACTICIPANT}/branches/${GIT_BRANCH}/versions/${COMMIT}" \
-d '{}
}'
````

Here is an example bash script that uses `cURL` to upload the the OAS and test results to PactFlow.

2. `publish.sh` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/publish-contracts.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L32) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/publish.sh)

```sh
#!/bin/bash

SUCCESS=true
if [ "${1}" != "true" ]; then
  SUCCESS=false
fi
OAS=$(cat oas/swagger.yml | base64) # Pass the "-w 0" flag if on linux
REPORT=$(cat /path/to/report.file | base64)

echo "==> Uploading OAS to PactFlow"
curl \
  -X PUT \
  -H "Authorization: Bearer ${PACT_BROKER_TOKEN}" \
  -H "Content-Type: application/json" \
  "${PACT_BROKER_BASE_URL}/contracts/provider/${PACTICIPANT}/version/${COMMIT}" \
  -d '{
   "content": "'$OAS'",
   "contractType": "oas",
   "contentType": "application/yaml",
   "verificationResults": {
     "success": '$SUCCESS',
     "content": "'$REPORT'",
     "contentType": "text/plain",
     "verifier": "verifier"
   }
 }'
```

Usage: `./publish.sh true|false`

#### Request Details

`publish_contracts` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/publish-contracts.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L32) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/publish.sh)

**Path**

The request should be a `PUT` to the following path:

```
{baseUrl}/contracts/provider/{application}/version/{version}
```

- `baseURL`

  The base URL of your PactFlow account e.g. https://myaccount.pactflow.io

- `application`

  The name of the provider API application

- `version`

  The version of the provider API application

**Body**

The following describes the body that should be sent in the API

- `content`

  The base64 encoded contents of the OAS (see [base64 encoding](#base64-encoding) below)

- `contractType`

  Must be `oas`

- `content_type`

  Must be `application/yaml`

- `verificationResults`

  This object contains the information about the test results

- `verificationResults.success`

  A boolean value indicating if the tests passed or failed (one of `true` or `false`)

- `verificationResults.content`

  The base64 encoded test results, which may be any output of your choosing (see [base64 encoding](#base64-encoding) below).

- `verificationResults.contentType`

  The content type of the results. Must be a valid mime type

- `verificationResults.verifier`

  The name of the tool used to perform the verification

  -->

