---
title: OpenAPI Specification Contracts
sidebar_label: OpenAPI Specification
---

Providers may specify an OpenAPI Specification as a Provider Contract, enabling teams to get reuse out of existing tools and processes.

## Supported versions

| Version           | Supported? |
| ----------------- | ---------- |
| Swagger (1.x)     | ❌         |
| Swagger (2.0)     | ✅         |
| OAS (up to 3.0.3) | ✅         |

## Compatibility with Consumer Contracts

Pact Consumer Contracts are the only compatible contracts at this time.

## Publishing the Provider Contract + Results to Pactflow

There are severals ways to currently publish contracts to Pactflow.

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
  pactflow publish-provider-contract CONTRACT_FILE \
  --broker-token=BROKER_TOKEN
  --broker-base-url=BROKER_BASE_URL
  --provider PROVIDER \
  --provider-app-version PROVIDER_APP_VERSION \
  --branch BRANCH \
  --content-type CONTENT_TYPE \
  --verification-exit-code=EXIT_CODE \
  --verification-results REPORT_PATH \
  --verification-results-content-type REPORT_CONTENT_TYPE \
  --verifier VERIFIER

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
  -o, [--output=OUTPUT]
              # json or text
              # Default: text
  -b, --broker-base-url=BROKER_BASE_URL
              # The base URL of your Pactflow account e.g. https://myaccount.pactflow.io
  -k, [--broker-token=BROKER_TOKEN]
              # The RW Token from your Pactflow account - https://myaccount.pactflow.io/settings/api-tokens
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
      --verification-results-content-type text/plain\
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
      --verification-results-content-type text/plain\
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
      --verification-results-content-type text/plain\
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

Here is an example bash script that uses `cURL` to create the branch version for the specified application to Pactflow.

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

Here is an example bash script that uses `cURL` to upload the the OAS and test results to Pactflow.

2. `publish.sh` ([API Reference](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/index/publish-contracts.markdown)) / [Example via Makefile](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/d562158cd0920eb57e5ba7007e65db4a9f08cbe9/Makefile#L32) / [Example Script](https://github.com/pactflow/example-bi-directional-provider-restassured/blob/master/scripts/publish.sh)

```sh
#!/bin/bash

SUCCESS=true
if [ "${1}" != "true" ]; then
  SUCCESS=false
fi
OAS=$(cat oas/swagger.yml | base64) # Pass the "-w 0" flag if on linux
REPORT=$(cat /path/to/report.file | base64)

echo "==> Uploading OAS to Pactflow"
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

  The base URL of your Pactflow account e.g. https://myaccount.pactflow.io

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

## Interpreting verification result failures

Verification results are generated dynamically when `can-i-deploy` is invoked for a given set of application versions and target environments.

When `can-i-deploy` is called, you will get a table of results that shows which applications are compatible and the verification URL which explains the results.

_Output from can-i-deploy_

```
CONSUMER                       | C.VERSION          | PROVIDER                       | P.VERSION          | SUCCESS? | RESULT#
-------------------------------|--------------------|--------------------------------|--------------------|----------|--------
pactflow-example-consumer-w... | 5785fb8+1622544123 | pactflow-example-provider-r... | 7f3d83f+1622544125 | true     | 1

VERIFICATION RESULTS
--------------------
1. https://testdemo.pactflow.io/hal-browser/browser.html#https://testdemo.pactflow.io/contracts/provider/pactflow-example-bi-directional-provider-restassured/version/7f3d83f%2B1622544125/consumer/pactflow-example-bi-directional-consumer-wiremock/pact-version/b421f8d1c0691e8304492c716e546427c4267c7f/verification-results (success)
```

Clicking on the verification results will take you to the resource in Pactflow and show you the detailed analysis.

### Response Object

- `summary`

  Whether or not the verification was successful

- `crossContractVerificationResults`

  This element contains the results of comparing the mock (pact contract) to the OpenAPI specification

- `providerContractVerificationResults`

  This contains the results of the provider verification, including the tool used to verify it, whether the test passed or failed and the base64 encoded OAS contract.

### Successful result

```
{
  "summary": {
    "success": true
  },
  "crossContractVerificationResults": {
    "success": true,
    "results": {
      "errors": [],
      "warnings": []
    },
    "verificationDate": "2021-06-01T10:42:30.980+00:00",
    "verifier": "atlassian-swagger-mock-validator",
    "verifierVersion": "10.0.0"
  },
  "providerContractVerificationResults": {
    "success": true,
    "content": "dGVzdGVkIHZpYSBSZXN0QXNzdXJlZAo=",
    "contentType": "text/plain",
    "verifier": "verifier"
  },
  "_links": {
    "self": {
      "title": "Cross contract and Provider Contract verification results",
      "href": "https://testdemo.pactflow.io/contracts/provider/pactflow-example-bi-directional-provider-restassured/version/7f3d83f%2B1622544125/consumer/pactflow-example-bi-directional-consumer-wiremock/pact-version/b421f8d1c0691e8304492c716e546427c4267c7f/verification-results"
    }
  }
}
```

### Failure result

```
{
  "summary": {
    "success": false
  },
  "crossContractVerificationResults": {
    "success": false,
    "results": {
      "errors": [{
          "code": "request.body.incompatible",
          "message": "Request body is incompatible with the request body schema in the spec file: should NOT have additional properties",
          "mockDetails": {
            "interactionDescription": "POST_/products_7436b06b-b387-4535-9d3a-da149d9826ba",
            "interactionState": "[none]",
            "location": "[root].interactions[0].request.body",
            "mockFile": "pact",
            "value": {
              "id": "27",
              "name": "pizza",
              "type": "food",
              "price": 27
            }
          },
          "source": "spec-mock-validation",
          "specDetails": {
            "location": "[root].paths./products.post.requestBody.content.application/json.schema.additionalProperties",
            "pathMethod": "post",
            "pathName": "/products",
            "specFile": "oas",
            "value": false
          },
          "type": "error"
        }, {
          "code": "response.body.incompatible",
          "message": "Response body is incompatible with the response body schema in the spec file: should NOT have additional properties - price",
          "mockDetails": {
            "interactionDescription": "GET_/products_646e1d83-da87-4155-9a43-3b24a2014cf3",
            "interactionState": "[none]",
            "location": "[root].interactions[1].response.body[0]",
            "mockFile": "pact",
            "value": {
              "name": "pizza",
              "id": "10",
              "type": "food",
              "price": 100
            }
          },
          "source": "spec-mock-validation",
          "specDetails": {
            "location": "[root].paths./products.get.responses.200.content.application/json; charset=utf-8.schema.items.additionalProperties",
            "pathMethod": "get",
            "pathName": "/products",
            "specFile": "oas",
            "value": false
          },
          "type": "error"
        }],
      "failureReason": "Mock file \"pact\" is not compatible with spec file \"oas\"",
      "warnings": []
    },
    "verificationDate": "2021-06-02T01:27:54.815+00:00",
    "verifier": "atlassian-swagger-mock-validator",
    "verifierVersion": "10.0.0"
  },
  "providerContractVerificationResults": {
    "success": true,
    "content": "dGVzdGVkIHZpYSBSZXN0QXNzdXJlZAo=",
    "contentType": "text/plain",
    "verifier": "verifier"
  }
}
```

In the case of a failure, the following elements of the `error` are most helpful in diagnosing the problem:

- `message`

  Summary of the problem. In most cases, you can understand the problem immediately. As above, you can see there are two errors - one for the request body, and another for the response body.
  In both cases (the request and response body), there is an additional unexpected property `price` expected by the consumer.

- `mockDetails`

  Contains details of the Consumer Contract (mock) that are problematic, including the path to the interaction in the contract and the request/response details.

- `specDetails`

  Contains details of the Provider Contract (spec) that are problematic, including the path to the component of the resource in the OpenAPI specification the mock is incompatible with.

## Considerations

When using OpenAPI Specifications as a Provider Contract, you should be aware of the following limitations.

### Document limitations

- The OAS must be a valid YAML or JSON file. Pactflow will pre-validate the document is parseable and error if they aren't valid.
- OAS documents must not be split across multiple files. You should combine any documents together, using tools like [OpenAPI Merge](https://github.com/robertmassaioli/openapi-merge) or [speccy](https://www.npmjs.com/package/speccy).
- YAML formatted OAS documents must not use [anchors](https://yaml.org/spec/1.2.2/#3222-anchors-and-aliases), due to the potential security issues (see [YAML bomb](https://en.wikipedia.org/wiki/Billion_laughs_attack) for more). If your auto-generated specs have anchors, you can pre-process them via tools like [spruce](https://github.com/geofffranks/spruce), that will expand them for you.

### Testing

- Note, Pactflow automatically sets `additionalProperties` in your OAS is set to `false` on any response body, to ensure a consumer won't get false positives if they add a new field that isn't actually part of the spec (see
  https://bitbucket.org/atlassian/swagger-mock-validator/issues/84/test-incorrectly-passes-when-mock-expects for an interesting read on why this is necessary. TL;DR - it's JSON Schemas fault)
- It is recommended to allow `additionalProperties` on request items to align with [Postel's Law](https://en.wikipedia.org/wiki/Robustness_principle)
- _Implementing_ a spec is not the same as being _compatible_ with a spec ([read more](https://pactflow.io/blog/contract-testing-using-json-schemas-and-open-api-part-1/)). Most tools only tell you that what you’re doing is _not incompatible_ with the spec. _NOTE: We plan to address this problem in the future via our OAS Testing Tool_
- You are responsible for ensuring sufficient OAS coverage. To highlight this point, in our [Dredd example](https://github.com/pactflow/example-bi-directional-provider-dredd), we do _not_ test the 404 case on the provider, but the consumer has a pact for it and it's tests still pass! _NOTE: We plan to address this problem in the future via our OAS Testing Tool_

### `allOf` support and other logical keywords

Because Pactflow sets `additionalProperties` to `false` to prevent false positives during validation, it means that the use of `allOf` is not supported.

See this [write up](https://bitbucket.org/atlassian/swagger-mock-validator/src/master/FAQ.md) on this specific issue.
