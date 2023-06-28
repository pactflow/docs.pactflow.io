---
title: OpenAPI Specification Contracts
sidebar_label: Overview
---

Providers may specify an OpenAPI Specification as a Provider Contract, enabling teams to get reuse out of existing tools and processes.

## Supported versions

| Version                 | Supported? |
| ------------------------| ---------- |
| Swagger (1.x)           | ❌         |
| Swagger (2.0)           | ✅         |
| OAS 3.0.x (up to 3.0.3) | ✅         |
| OAS 3.1.x (up to 3.1.0) | ✅         |

## Limitations and Considerations

### PactFlow transforms your OAS

In order for PactFlow to perform its compatibility checks, and support many of the OAS [features](/docs/bi-directional-contract-testing/contracts/oas/features), it needs to perform a number of transformations on the document prior to validation.

The transformations it applies, are as follows:

1. Sets `additionalProperties` in your OAS to `false` on any response body, to ensure a consumer won't get false positives if they add a new field that isn't actually part of the spec (see
  https://bitbucket.org/atlassian/swagger-mock-validator/issues/84/test-incorrectly-passes-when-mock-expects for an interesting read on why this is necessary. TL;DR - it's a JSON Schema thing).
2. Dereferences all uses of `$ref`.
1. Inlines of the `allOf` schemas. This has the effect of matching against a single schema, and won't cause issues with the `additionalProperties` check. 
3. Adds `additionalProperties: true` wherever a logical keyword is used at the top of a schema ([example](https://github.com/pactflow/bdct-oas-examples/blob/ee636c614ce8d5b562adb141fbaae385a29a87da/examples/inheritance/inheritance.oas.yml#L26)).
4. Ensures any polymorphic types both have a `discriminator` and have an `enum` set on it to restrict the possible sub-types ([example](https://github.com/pactflow/bdct-oas-examples/blob/ee636c614ce8d5b562adb141fbaae385a29a87da/examples/inheritance/inheritance.oas.yml#L47)).

The consequences of the above transformations are:

1. The transformed OAS will be expanded, and will not match what you provided PactFlow
2. It modifies the semantics of `allOf` slightly. In most cases, the use of `allOf` is intended for use with polymorphic/inheritance scenarios. The JSON Schema semantics of `allOf` are such that it would prevent this use case by default, and inferring when teams wish to use it one way or the other is challenging, and we default to the most common use case.

You can [opt-out](/docs/bi-directional-contract-testing/contracts/oas/configuration) of this behaviour to be able to more granularly control the semantics, however if you do, you will need to [manually](/docs/bi-directional-contract-testing/contracts/oas/keyword-support#manual-support) edit your OAS to support a number of use cases.

### Document Limitations

When using OpenAPI Specifications as a Provider Contract, you should be aware of the following limitations.

- The OAS must be a valid YAML or JSON file. PactFlow will error if an invalid document is provided.
- OAS documents must not be split across multiple files. You should combine any documents together, using tools like [OpenAPI Merge](https://github.com/robertmassaioli/openapi-merge) or [speccy](https://www.npmjs.com/package/speccy). That is, PactFlow can not resolve remote references to files, and will not resolve URL references.
- YAML formatted OAS documents must not use [anchors](https://yaml.org/spec/1.2.2/#3222-anchors-and-aliases), due to the potential security issues (see [YAML bomb](https://en.wikipedia.org/wiki/Billion_laughs_attack) for more). If your auto-generated specs have anchors, you can pre-process them via tools like [spruce](https://github.com/geofffranks/spruce), that will expand them for you.

### Other Considerations

- It is recommended to set `additionalProperties` to `true` on request items to align with [Postel's Law](https://en.wikipedia.org/wiki/Robustness_principle)
- _Implementing_ a spec is not the same as being _compatible_ with a spec ([read more](https://pactflow.io/blog/contract-testing-using-json-schemas-and-open-api-part-1/)). Most tools only tell you that what you’re doing is _not incompatible_ with the spec.
- You are responsible for ensuring sufficient OAS coverage. To highlight this point, in our [Dredd example](https://github.com/pactflow/example-bi-directional-provider-dredd), we do _not_ test the 404 case on the provider, but the consumer has a pact for it and it's tests still pass! _NOTE: We plan to address this problem in the future via our OAS Testing Tool_