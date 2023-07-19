---
title: Pact Contracts
sidebar_label: Pact
---

## Supported Pact Specification versions

| Version | Supported? |
| ------- | ---------- |
| [1](https://github.com/pact-foundation/pact-specification/tree/version-1)       | ✅         |
| [1.1](https://github.com/pact-foundation/pact-specification/tree/version-1.1)   | ✅         |
| [2](https://github.com/pact-foundation/pact-specification/tree/version-2)       | ✅         |
| [3](https://github.com/pact-foundation/pact-specification/tree/version-3)       | ✅         |
| [4](https://github.com/pact-foundation/pact-specification/tree/version-4)       | ✅ *       |

\* When using [Pact specification V4](https://github.com/pact-foundation/pact-specification/tree/version-4) note that only interactions with type "Synchronous/HTTP" are validated. Bi-directional Contract validation ignores other interaction types such as "Asynchronous/Messages".

:::note On-Premises support
* Pact Specification Version 3 from release 1.19.0
* Pact Specification Version 4 from release 1.25.0
:::
## Compatibility with Provider Contracts

Pact contracts may be used in the following situations:

| Consumer Contract | Provider Verification    |
| ----------------- | ------------------------ |
| Pact              | Pact                     |
| Pact              | OpenAPI (bi-directional) |

## Strategies to capture consumer contracts

### Transform mock files

Some tools allow you to serialise their mocks to file. In this case, you can create a CLI tool to read the mock and transform it into a Pact file.
Teams also build custom mock servers using simply HTTP frameworks like ExpressJS with a set of JSON fixture files.
One of the benefits of this approach is that if the mocking tool is used in multiple places and languages, you can reuse a single CLI tool.

Examples include Mountebank and Wiremock.

### Record/Replay

If you have your own custom mocking server, or want to test against a real environment periodically, a record/replay strategy could be a useful strategy.

Tools like [VCR](https://github.com/vcr/vcr) and [Polly](https://netflix.github.io/pollyjs) can record the actual calls your application makes and store them as a fixture file for future use.
This makes your tests reliable but introduces the possibility of drift. Converting these mocks into a pact file reduces that possibility.

See our [record/replay](/docs/examples/bi-directional/consumer/recordreplay) example for more information.

### API integration

Most tools have language specific APIs you can use to introspect the actual calls made to the mocks, in order to review behaviour.

In this mode, you must be careful to serialise only the mocks invoked by the application.

See our [Wiremock](/docs/examples/bi-directional/consumer/wiremock) example for more information.

## Converting mocks into a Pact compatible format

When converting your mocks into a pact file, note the following considerations:

1. You **must** generate a Pact file that is compatible with one of the supported versions of the Pact Specification (listed in the table above).
1. You **should not** include any [matchers](https://github.com/pact-foundation/pact-specification/tree/version-2/#matchers), unless you are confident in their application.
   - Matchers are currently ignored by the cross-contract validation process but may be supported at a later date
1. You **should** validate the pact file is correct prior to uploading to PactFlow. You can use the JSON schema below or attempt to load it into a [stub server](https://docs.pact.io/getting_started/stubs/).

Below is a pact file based on the [Wiremock](/docs/examples) example project.

```json
{
  "consumer": { "name": "pactflow-example-bi-directional-consumer-wiremock" }, // The name of the consumer application
  "provider": { "name": "pactflow-example-bi-directional-provider-restassured" }, // the name of the provider application
  "interactions": [
    {
      "description": "POST_/products_f25f7b8e-35f2-4796-bebf-5f61d31d06b3", // Ideally a human readable description of the scenario, if possible
      "request": {
        "method": "POST",
        "path": "/products",
        "query": "foo=bar&baz=bat&bat=1&bat=2", // note array syntax is not supported for multiple query params (i.e. the bat param)
        "body": {
          // this may be any valid JSON value such as a string or object
          "id": "27",
          "name": "pizza",
          "type": "food",
          "price": 27.0
        },
        "headers": { "Content-Type": "application/json" } // key/value pairs of expected headers
      },
      "response": {
        "status": 200,
        "headers": { "Content-Type": "application/json" },
        "body": { "id": "27", "name": "pizza", "type": "food" }
      }
    }
  ],
  "metadata": {
    "pactSpecification": { "version": "2.0.0" },
    "client": {
      // These aren't mandatory, but are useful in
      "name": "name of the adapter",
      "version": "semver compatible version of the adapter"
    }
  }
}
```

## Pact JSON Schema

You can use this [JSON schema](https://bitbucket.org/atlassian/pact-json-schema/src/master/schemas/v2/schema.json) as a guide to validate your pact generation tool.
