---
title: Compatibility Checks (breaking change detection)
sidebar_label: Compatibility Checks
---

When contracts are published to PactFlow, the consumer contract (a pact file) will be verified against the Open API Specification (OAS). PactFlow ensures the consumer contract is a subset of what is in the OAS. In other words, check that all interactions in the Pact file are valid for that OAS.

:::note

PactFlow can only decide based on the information it receives. If the consumer contract does not contain all the 
interactions the consumer uses, then the resulting checks may say it is safe to deploy when it could not be. This is because the missing API calls may have breaking changes.

:::

A tabbed [detail screen](/docs/user-interface/bi-directional) displays the contracts involved and the verification status for the interaction.

There are three conditions that could result in an invalid (or failed) integration:

1. The provider self-verification test results indicate failure. This means that the provider build ran some tests against the OAS and the result was a failure.
2. The consumer Pact verification results failed. This means the Pact consumer tests failed, and the consumer is not compatible with the published Pact file.
3. The consumer Pact file is not compatible with the OAS.

## Compatibility checks

For the specific validations and checks performed, refer to OAS [features and testing](/docs/bi-directional-contract-testing/contracts/oas/features).

## Interpreting verification result failures

Verification results are automatically pre-generated when a consumer contract is published against a number of common provider versions (such as deployed versions). They are also generated dynamically when `can-i-deploy` is invoked for a given set of application versions and target environments.

Compatibility are visible from the user interface, in the API and in the output of `can-i-deploy`.
### User Interface 

Compatibility results are listed on the [detail view page](/docs/user-interface/bi-directional#detail-page), grouped by the relevant API resource in the OpenAPI document. They are also on the [consumer contract tab](/docs/user-interface/bi-directional#consumer-contract-tab), grouped by the interactions defined in the consumer contract.

![Bi-directional Contract Test Error](/ui/bdct-cross-comparison-error.png)

### Can I Deploy

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

In some cases, results may not yet have been generated and entries in the above table will be unknown. To address this, you should consider polling via the `--retry-while-unknown` and `--retry-interval` flags. See this [blog post](https://pactflow.io/blog/resilient-builds-with-can-i-deploy-2/) for more.

:::

### API Resources
#### Response Object

- `summary`

  Whether or not the verification was successful

- `crossContractVerificationResults`

  This element contains the results of comparing the mock (pact contract) to the OpenAPI specification

- `providerContractVerificationResults`

  This contains the results of the provider verification, including the tool used to verify it, whether the test passed or failed and the base64 encoded OAS contract.

#### Successful result

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

#### Failure result

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


### Contract Compatibility Errors

All errors and warnings are written from the consumer's perspective, referencing a "spec file" (the OpenAPI Document). 

For example, if the consumer calls an unknown endpoint `/products/10`, the error `code` will be:
```
request.path-or-method.unknown`
```

and the corresponding `message`:

```
Path or method not defined in spec file: GET /products/10
```

All errors contain 3 major components to aid with debugging:

| Component | Description |
| ----------|-------------|
| [Code](#error-codes) | The category of error or warning discovered (see [table](#error-codes)). Warnings do not fail the compatibility check, but indicate a potential misunderstanding. Warnings are displayed alongside errors in the user interface and API resources.  |
| [Message](#error-messages) | A description of the violation, usually in the form of a JSON Schema validation error (see [table](#error-messages))  |
| [Interaction Path](#error-path) | A JSON-path like syntax that can help you reference the specific property in the interaction, within the consumer contract that is incompatible with the provider contract, including the errant value to review |

#### Error Codes

A `code` describes the category of the problem, such as an incorrect header or an unexpected property. 

This table describes error codes, descriptions and general advice to resolve them. Note that `spec` is the terminology used to refer to the provider contract/OpenAPI Document. `Interaction` is used to refer to the problematic interaction in the pact file.

| Error Code               | Type | Description | Fix |
| ---------------------------- | ----------- | --- |--|
| `request.accept.incompatible`       | Error   | The `Accept` header in the interaction does not match any of the mime-types in the OpenAPI document | Check your consumer test to ensure the expected mime type matches an acceptable mime type in the provider contract |
| `request.accept.unknown`            | Warning | There is an `Accept` header in your interaction, but the OpenAPI Document does not return any content. | This is a redundant header that should be removed. If there is an expected body, this is likely to be an error. |
| `request.authorization.missing`     | Error   | The interaction lacks an Authorization query or header, but is required by the spec file. | Update the pact test to ensure it has an appropriate authorization scheme. |
| `request.body.incompatible`         | Error   | The request body in the interaction is incompatible with the request body schema in the spec. | Review the JSON schema validation message. |
| `request.body.unknown`              | Warning | No matching schema could be found for the request body | Your API Provider does not expect a request body, or the request body does not match one of the allowed schemas (for example, in a `oneOf` clause. Check if a request body is required) |
| `request.content-type.incompatible` | Error   | Request Content-Type header is incompatible with the mime-types the spec accepts to consume | Confirm that your pact test is sending the correct content type |
| `request.content-type.missing`      | Warning | Request content type header is not defined but spec specifies mime-types to consume | It's possible your provider will send a mime type your consumer doesn't expect if it produces more than one mime type. You should explicitly set the `Accept` header in your pact test. |
| `request.content-type.unknown`      | Warning | Request content-type header is defined but the spec does not specify any mime-types to consume | The request body is redundant. Check if the spec should be accepting one, or remove it from your Pact test |
| `request.header.incompatible`       | Error   | The interaction response header is incompatible with the spec | Review the JSON Schema validation message |
| `request.header.unknown`            | Warning | Request header is not defined in the spec file | Remove the redundant header or ensure it is defined in the spec |
| `request.path-or-method.unknown`    | Error   | The Path or method used in the interaction is not defined in spec file | Check the correct resource is being used |
| `request.query.incompatible`        | Error   | The request query in the interaction is incompatible with the spec | Review the JSON Schema validation message |
| `request.query.unknown`             | Warning | The query parameter in the interaction is not defined in the spec file | Review if the query parameter is valid. |
| `response.body.incompatible`        | Error   | The response body in the interaction is incompatible with the spec | Review the JSON Schema validation message |
| `response.body.unknown`             | Warning | No matching schema was found for response body | Your API Provider does not return a response body, or the response body does not match one of the allowed schemas (e.g. in a `oneOf` clause. Check if a response body is required) |
| `response.content-type.incompatible` | Error  | Response `Content-Type` header is incompatible with the mime-types the spec defines to produce | Confirm that your pact test is consuming the correct content type |
| `response.content-type.unknown`      | Warning | Response content-type header is defined but the spec does not specify any mime-types to produce | The response body is redundant. Check if the spec should be returning one, or remove it from your Pact test |
| `response.header.incompatible`    | Error     | The response header in the interaction is incompatible with the spec | Review the JSON Schema validation message |
| `response.header.unknown`         | Warning   | Response header is not defined in the spec file | Remove the redundant header or ensure it is defined in the spec |
| `response.status.default`         | Warning   | The interaction is using a response status code that is a default response in the spec file | Avoid default responses as they increase the ambiguity of possible valid response types |
| `response.status.unknown`         | Error     | The expected response status code is not defined in the spec | Check the spec to see what valid status codes are returned. |

#### Error Messages

There are broadly three categories of error:

* Unknown - values that aren't defined in the spec, but referenced in the interaction.
* Missing - values that are required in the spec, but are missing in the interaction.
* Incompatible - values that are both defined in the spec and referenced in the interaction, but are incompatible. 

For the ones deemed "incompatible", they will usually be accompanied by a detailed error message explaining the mismatch, which will be JSON Schema errors.

#### Error Path

Error paths use a JSONPath-like syntax with an associated value, to help you navigate from the error to the specific problematic component within the Pact interaction. The syntax is straightforward. Here are a few examples:

* `[root].interactions[0].response.body = {"id":"09","type":"CREDIT_CARD","name":"Gem Visa","price":99.99}` - the response body (with value `{"id":"09","type":"CREDIT_CARD","name":"Gem Visa","price":99.99}`) expected in the first pact interaction is incompatible
 - the `Access-Control-Allow-Origin` header (with a value of `"*"`) in the first pact interaction
* `[root].interactions[0].response.headers.access-control-allow-origin = "*"` - the `Access-Control-Allow-Origin` header (with a value of `"*"`) in the first pact interaction
* `[root].interactions[1].request.query.id = "2"` - the `id` query parameter (with a value of `2`) in the 2nd pact interaction
* `[root].interactions[3].request.path` - the request path in the third pact interaction

### Common Error types

##### `additionalProperties`

When a pact test expectats a response body, it may ask for a subset of what the provider can provide - this is perfectly acceptable. However it cannot ask for a property not present in the spec - this will cause failure - and is the most common error of this kind.

For example, if there is an expected property `foo` in your pact file that does not match a schema in the OpenAPI Document, the following error will be displayed:

```
Response body is incompatible with the response body schema in the spec file: must NOT have additional properties - foo
```

In JSON Schema terminology, `foo` is an "additional property" not defined in the schema. For a detailed tour of this topic, refer to [this guide](/docs/bi-directional-contract-testing/contracts/oas/keyword-support)

The error you will receive will be: `Request body is incompatible with the request body schema in the spec file: must NOT have additional properties - &lt;property&gt;`. The problematic property should be identified by name.

To correct this, the problematic property should be removed from the pact interaction, or supplied by the spec.

#### `unevaluatedProperties` (`allOf`)

When a pact test expectats to send a request body or to receive a response body, the body must match any defined schemas.

If the `allOf` keyword is used, we must treat all the schemas as a single composite schema. As per the `additionalProperties` checks, if a property is expected that is not part of this composite schema, a similar error will be returned:

```
Response body is incompatible with the response body schema in the spec file: must NOT have unevaluated properties
```

To correct this, the problematic property should be removed from the pact interaction, or supplied by the spec.

Refer to the [`unevaluatedProperties`](https://json-schema.org/understanding-json-schema/reference/object.html#unevaluated-properties) documentation of JSON Schema for more.