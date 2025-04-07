---
title: OpenAPI Specification Contracts
sidebar_label: Overview
---

Providers may specify an OpenAPI Specification as a Provider Contract, enabling teams to reuse existing tools and processes.

## Supported versions

| Version                 | Supported? |
| ------------------------| ---------- |
| Swagger (1.x)           | ❌         |
| Swagger (2.0)           | ✅         |
| OAS 3.0.x (up to 3.0.3) | ✅         |
| OAS 3.1.x (up to 3.1.0) | ✅         |

## Limitations and Considerations

### PactFlow transforms your OAS

PactFlow needs to perform a number of minor modifications to the document prior to validation to perform its compatibility checks and support many OAS [features](/docs/bi-directional-contract-testing/contracts/oas/features). In most cases, they will be transparent to you. You can find more information [here](/docs/bi-directional-contract-testing/contracts/oas/keyword-support).

### Document Limitations

When using the OpenAPI Specifications as a Provider Contract, you should know the following limitations.

- The OAS must be a valid YAML or JSON file. PactFlow will give an error if an invalid document is provided.
- OAS documents must not be split across multiple files. You should combine the documents together, using tools like [OpenAPI Merge](https://github.com/robertmassaioli/openapi-merge) or [speccy](https://www.npmjs.com/package/speccy). That is, PactFlow can not resolve remote references to files, and will not resolve URL references.
- YAML formatted OAS documents must not use [anchors](https://yaml.org/spec/1.2.2/#3222-anchors-and-aliases), due to the potential security issues (see [YAML bomb](https://en.wikipedia.org/wiki/Billion_laughs_attack) for more). If your auto-generated specs have anchors, you can pre-process them via tools like [spruce](https://github.com/geofffranks/spruce), that will expand them for you.
- Circular references in schemas are not supported (See [Validating self-referencing data structures](https://github.com/ajv-validator/ajv/issues/461) for additional information).

### Other Considerations

- It is recommended to set `additionalProperties` to `true` on request items to align with [Postel's Law](https://en.wikipedia.org/wiki/Robustness_principle).
- _Implementing_ a spec is not the same as being _compatible_ with a spec ([read more](https://pactflow.io/blog/contract-testing-using-json-schemas-and-open-api-part-1/)). Most tools only tell you that what you’re doing is _not incompatible_ with the spec.
- You are responsible for ensuring sufficient OAS coverage. To highlight this point, in our [Dredd example](https://github.com/pactflow/example-bi-directional-provider-dredd), we do _not_ test the 404 case on the provider, but the consumer has a pact for it and its tests still pass! _NOTE: We plan to address this problem in the future via our OAS Testing Tool_.
