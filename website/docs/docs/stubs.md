---
id: stubs
title: Stubs
---

## Stub APIs

Every consumer contract published to PactFlow is automatically assigned a hosted API stub URL that you can use for stubbing API backends in your testing.

Hosted API stubs are useful for several use cases, such as:

1. Replacing end-to-end test environments when running UI testing tools like Cypress or mobile UI tests
1. Using as a dynamic test environment for new feature testing
1. Local development with multiple back-ends
1. Sharing with other teams so they can experiment safely with your API

## Supported Pact Specification versions

| Version | Supported? |
| ------- | ---------- |
| 1       | ✅         |
| 1.1     | ✅         |
| 2       | ✅         |
| 3       | ✅         |
| 4+      | ✅         |

## Basic Use

To use the stub:

1. You must first publish a contract.
1. Find the path to the pact contract you'd like to stub. (If you're not familiar with the PactFlow API, the simplest way to get this is to click "View Pact" from the dashboard and select "API Browser" at the top of the screen to see the URL).
1. Append `/stub/` to the pact file path to get the base path of an instant stub.
1. Pass in your PactFlow read-only API bearer token in the `Authentication` header.

## Stub URL format

Pacts may be retrieved in several ways; the latest version, the latest with a particular tag, or the latest for a consumer version.

Stub URLs will have one of the following formats:

| Description | URL |
| ----------- | --- |
| Latest for integration | `/pacts/provider/:provider/consumer/:consumer/latest/stub` |
| Latest for a given branch | `/pacts/provider/:provider/consumer/:consumer/branch/:branch/latest/stub` |
| Latest for a given tag | `/pacts/provider/:provider/consumer/:consumer/latest/:tag/stub` |
| Latest for a consumer version | `/pacts/provider/:provider/consumer/:consumer/:version/stub` |

For example, assuming you wanted to use the latest version of a particular contract as your stub, the base URL to configure in your client code would be:

```sh
https://<yourdomain>.pactflow.io/pacts/provider/:provider/consumer/:consumer/latest/stub
```
## Stub behaviour

Pact contracts may define multiple overlapping requests - for example when there are provider states.

If the request matches any interactions, it will return the first response based on the order in the pact file.

If the request does not match, it will return the errors from the interaction with the least number of mismatches, followed by the order in the Pact file.

This matching behaviour may be [configured](#configuration) using additional headers sent with a request.

**Example**

Given a pact with two interactions with query `a=1` and `a=1&b=2&c=4`. If the stub server receives a request with query `a=1&b=2`, you get the error that query parameter `b` was not expected, instead of query parameter `c` is missing.

The same principle applies to headers.

### Mismatches

When a request does match an interaction in the pact file, an HTTP `500` is returned with an array of mismatches:

```
< HTTP/2 500
< content-type: application/json
< content-length: 66
< date: Mon, 03 Feb 2025 02:48:14 GMT
...
<
{
  "mismatches": [
    "Expected query parameter 'from' but was missing"
  ]
}
```

## Configuration

You can configure the behaviour of the stub service at runtime, using HTTP headers sent with the stub requests.

| Header | Type | Description | Default |
|--------|------|-------------|---------|
| `pactflow-stub-cors` | boolean  | Automatically responds to OPTIONS requests and return default CORS headers. For more on CORS, refer to the [section](#cors) below. | `true` |
| `pactflow-stub-cors-referer` | boolean | When set to `true`, sets the CORS origin value to the hostname of the referer URL. If set to `false`, or if there is no referer header, sets it to '*". | `false` |
| `pactflow-stub-provider-state` | string | Provider state regular expression used to filter the responses. | n/a |
| `pactflow-stub-include-empty-provider-states` | boolean | Includes empty provider states when filtering with `pactflow-stub-provider-state`. If set to `true`, it matches the first interaction that has either no provider states or an empty provider state (`""`). It will then fall back to `pactflow-stub-provider-state` or the first matching interaction. | `false` |
| `pactflow-stub-authorization-header` | string | Used in place of the `Authorization` header, which is consumed by the PactFlow API. If not present, Authorization headers are ignored when matching interactions. | |

## Example

_The following example uses the example projects in our [CI/CD workshop](https://docs.pactflow.io/docs/workshops/ci-cd/)_

Let's say you have a [Product API](https://github.com/pactflow/example-provider) `example-provider` that you want to stub when working with a [React consumer](https://github.com/pactflow/example-consnumer) `example-consumer`.

There are two main endpoints:

* `GET /products`: Retrieve all products:
* `GET /products/:id`: Retrieve a single product

The (simplified) pact file for this integration looks like this:

```json
{
  "consumer": {
    "name": "example-consumer"
  },
  "provider": {
    "name": "example-provider"
  },
  "interactions": [
    {
      "description": "a request to get a product",
      "providerState": "a product with ID 10 exists",
      "request": {
        "method": "GET",
        "path": "/product/10",
        "headers": {
          "Authorization": "Bearer 2019-01-14T11:34:18.045Z"
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json; charset=utf-8"
        },
        "body": {
          "id": "10",
          "type": "CREDIT_CARD",
          "name": "28 Degrees"
        }
      }
    },
    {
      "description": "a request to get all products",
      "providerState": "products exists",
      "request": {
        "method": "GET",
        "path": "/products",
        "headers": {
          "Authorization": "Bearer 2019-01-14T11:34:18.045Z"
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json; charset=utf-8"
        },
        "body": [
          {
            "id": "10",
            "type": "CREDIT_CARD",
            "name": "28 Degrees"
          }
        ]
      }
    }
  ],
  "metadata": {
    "pactSpecification": {
      "version": "2.0.0"
    }
  }
}
```

You want to use the latest pact file for the stub, which is hosted on `test.pactflow.io`. In the example app, you can set the base URL of all API calls with the environment variable `REACT_APP_API_BASE_URL`.

```sh
export REACT_APP_API_BASE_URL=https://test.pactflow.io/pacts/provider/pactflow-example-provider/consumer/pactflow-example-consumer/latest/stub
npm start
```

That's it - if you open the application in your browser, you can navigate around, using the live stub service.

![Integration Dashboard](/ui/stubs/dev-console.png)

## CORS

By default, [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests are enabled on all stub APIs. The CORS configuration is as follows:

| CORS header | Configuration | Description |
| ----------- | ------------- | ----------- |
| `Access-Control-Allow-Origin` | Reflects the `Origin` sent in the HTTP pre-flight request (default) or `'*'` if `pactflow-stub-cors-referer` is set to `true`. | All origins are allowed |
| `Access-Control-Allow-Headers` | `*` | All headers are allowed |
| `Access-Control-Allow-Methods` | `*` | All methods are allowed |
| `Access-Control-Allow-Credentials` | `true` | Credentials may be sent in CORS requests |

## Authentication

The `Authorization` header cannot be used natively in PactFlow stubs, as this header is reserved for use by PactFlow to authenticate all calls into the platform.

If your interactions use this header, you can specify a custom header value into the `pactflow-stub-authorization-header` header instead. When matching interactions, the stub server will treat it as if it were the `Authorization` header.

For example:

```
curl 
  -H"authorization: Bearer <PactFlow token>" \
  -H"pactflow-stub-authorization-header: x-authorization" \
  -H"x-authorization: Bearer XYZ" \
  https://example.pactflow.io/pacts/provider/ProviderApp/consumer/ConsumerApp/latest/stub/products
```

Refer to the [Configuration](#configuration) section for more.

## Limitations

### 1. Plugins

Interactions that use plugins are not supported.

### 2. Headers containing underscores

When calling the stub API, any request headers that include underscores will be automatically converted to hyphens. For example, if you send `some_header: foo` it will be received by the stub server as `some-header: foo`.

### 3. Provider contracts (OpenAPI descriptions)

The stub server does not support provider contracts, including OpenAPI descriptions.

## Finding the URL to a pact resource

### Via the User Interface

You can copy the stub URL template from the [contract details page](/docs/user-interface/contract#menu-items) view via the `...` drop-down. This is the simplest method and is easily customized as per the URL format described above.

### Via the API

Sometimes you need to find the exact version. To do this, you can navigate to the API user the HAL browser (and also directly via the API on the command line).

### 1. Find the integration

Navigate to the [contract details page](/docs/user-interface/contract#menu-items) for a application version of interest. Copy the pact URL using the `...` menu.

### 2. Open the API Browser

Open the API  (available at https://TENANT.pactflow.io/explorer) by selecting "API" in the header toolbar, and paste the URL into the navigation text box.

![API Browser](/ui/stubs/stubs-api-browser.png)

### 3. Find the pact

From here, you will be at the latest integration version. You can navigate from here to the specific version of an integration to get the URL you need:

1. Select `->` to navigate to the latest version
1. Select `->` to navigate to the latest tagged version of the pact
2. Copy the URL at this address to get the path to the pact file.

![API Browser](/ui/stubs/stubs-api-browser-url.png)