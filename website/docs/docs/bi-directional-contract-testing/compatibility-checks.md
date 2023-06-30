---
title: Compatibility Checks (breaking change detection)
sidebar_label: Compatibility Checks
---

When BDC contracts are published to PactFlow, the consumer contract (a pact file) will be verified against the Open API Specification (OAS). PactFlow will ensure that the consumer contract is a subset of what is in the OAS i.e. it will check that all  interactions in the Pact file are valid for that OAS.

:::note

PactFlow can only make a determination based on the information it receives. If the consumer contract does not contain all the 
interactions the consumer uses, then the resulting checks may say it is safe to deploy when it could not be because the missing API
calls may have breaking changes.

:::

The [detail screen](/docs/user-interface/bi-directional) for the BDC interaction has different tabs that display the contracts involved and the status of the verification. The interaction could be in an invalid (or failed) state due to the following three conditions:

1. The provider self-verification test results indicate that they have failed. This means that the provider build ran some tests against the OAS and the result was a failure.
2. The consumer Pact verification results have failed. This means the consumer Pact tests failed, and the consumer is not compatible with the published Pact file.
3. The consumer Pact file is not compatible with the OAS.

## Compatibility checks

For the specific validations and checks performed, see the section on OAS [Features and Testing](/docs/bi-directional-contract-testing/contracts/oas/features).

## Interpreting verification result failures

Verification results are pre-generated automatically when a consumer contract is published against a number of common provider versions (such as deployed versions). They are also generated dynamically when `can-i-deploy` is invoked for a given set of application versions and target environments.

When these checks are complete, they are visible from the [detail screen](/docs/user-interface/bi-directional) in the PactFlow UI, the API and in the output of `can-i-deploy`.

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

Clicking on the verification results will take you to the (API) resource in PactFlow and show you the detailed analysis.

:::note

In some cases, results may not yet have been generated and entries in the above table will be unknown. To address this, you should consider the use of polling via the `--retry-while-unknown` and `--retry-interval` flags. See this [blog post](https://pactflow.io/blog/resilient-builds-with-can-i-deploy-2/) for more.

:::

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
    "verifier": "pactflow-swagger-mock-validator",
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
    "verifier": "pactflow-swagger-mock-validator",
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

