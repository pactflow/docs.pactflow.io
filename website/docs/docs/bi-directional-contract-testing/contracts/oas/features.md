---
title: Features
sidebar_label: Features & Testing
---

Here you can find the supported features and compatibility checks PactFlow applies when comparing consumer contracts (pact files) against an OpenAPI document.

## Testing

**Key**

* `Y` - Fully supported.
* `N` - No support. Either the feature is not supported, or is ignored for the purposes of the checks
* `P` - Partial support (see description for caveats).

### Use cases
|Feature|Supported|Description|Example|
|--- |--- |--- |--- |
|Negative scenario testing|Y|Allow expectations for non-successful responses (e.g. 4xx, 5xx responses). |[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/negative)|
|Inheritance and Polymorphism|Y|Inheritance is supported via the use of the [`discriminator`](https://spec.openapis.org/oas/v3.1.0#discriminator-object) keyword.|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/inheritance)|
|Content Negotiation (media types)|Y|Use of accept header to differentiate response, or to use as a versioning strategy. Fully complies with [​RFC 9110: HTTP Semantics §12](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.1). It supports: <ul><li>multiple `Accept` header values</li><li>parameters (`;key=value`)</li><li> interpretation and calculation of weightings ([quality values](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.4.2))</li><li>resolves [media-ranges](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.1-2) (e.g. `type/*` or `*/*`)</li><li>Order the acceptable media types by their weighting and order (no weighting specified = 1, max of 1, min of .001 and 0 = not-acceptable)</li><li>resolves ambiguous types via `content-type` hierarchy e.g. `application/specific+json` is a narrower type of `application/json​`</li></ul>|Examples: <ul><li>[Content Negotiation](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/contentNegotiation)</li><li>[Media Types](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/mediaTypes)</li></ul>|
|Vendor specific content types|Y|Allows organisations to use custom (vendor) created content types. See content negotiation above for more.|

### OpenAPI Support

#### Open API Specification Versions
|Spec Version|Supported|Description|
|--- |--- |--- |
|1.x|N|[Swagger Specification v1.2](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/1.2.md) |
|2.0|Y|[​OpenAPI Specification v2.0](https://spec.openapis.org/oas/v2.0) |
|3.0.x|Y|[​OpenAPI Specification v3.0.3](https://spec.openapis.org/oas/v3.0.3) |
|3.1.x|Y|[​OpenAPI Specification v3.1.0](https://spec.openapis.org/oas/v3.1.0) |

#### Document Format
|Format|Supported|
|--- |--- |
|YAML|Y|
|JSON|Y|

#### Resource Types
|Feature|Supported|Description|
|--- |--- |--- |
|HTTP|Y||
|Webhooks|N|Reverses the direction of the check, and doesn’t make sense (Pact can’t describe a consumer expecting a provider call)|

#### [Document Schema](https://spec.openapis.org/oas/v3.1.0#schema-object)
Full JSON Schema 2020-12 support, including resolving [references ($ref)](https://spec.openapis.org/oas/v3.1.0#reference-object)

|Feature|Supported|Description|Example|
|--- |--- |--- |--- |
|[Server Object](https://spec.openapis.org/oas/v3.1.0#server-object)|N|The `servers` are not used in request matching. See [Issue #28](https://github.com/pactflow/swagger-mock-validator/issues/28) for background. Comparison of Pact interactions to OAS endpoints does not consider any `basePath` in its comparison. In [OAS 3 (and also 2)](https://swagger.io/docs/specification/api-host-and-base-path/), all API endpoints are considered to be relative to the base URL. For example, assuming the base URL of `https://api.example.com/v1`, the `/users` endpoint refers to `https://api.example.com/v1/users`. Our comparison does not consider the impact of `basePath` as there may be multiple servers with different context paths and there is no clear way to resolve this ambiguity. In this example, a pact interaction with path `/v1/users/` will not match an OAS that only has `/users/` in its resource path.  |[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/servers)|
|[Security Filtering](https://spec.openapis.org/oas/v3.1.0#security-filtering)|N|Ignored||
|[Info](https://spec.openapis.org/oas/v3.1.0#security-filtering)|N|Ignored||
|[Contact](https://spec.openapis.org/oas/v3.1.0#contact-object)|N|Ignored||
|[License](https://spec.openapis.org/oas/v3.1.0#license-object)|N|Ignored||
|[External Documentation](https://spec.openapis.org/oas/v3.1.0#external-documentation-object)|N|Ignored||
|[Security Scheme](https://spec.openapis.org/oas/v3.1.0#security-scheme-object)|P|See below for detail. Supports all valid values,  only validates only: `apiKey`||
|[Relative References](https://spec.openapis.org/oas/v3.1.0#relative-references-in-uris)|Y|||
|[Callbacks](https://spec.openapis.org/oas/v3.1.0#callback-object)|N|Not supported||
|[Parameter styles](https://spec.openapis.org/oas/v3.1.0#parameterStyle)|P|See also https://swagger.io/docs/specification/serialization/. <br/><br/>Missing parameters will cause a validation *warning* but not fail the checks<br/><br/>We can’t currently compare non-primitive query string values to the OAS, because Pact does not encode the style of encoding. This means we can’t reliably differentiate the cases where an object or array is encoded. We can check primitive values match the schema. <br/><br/>Where a pact interaction does not satisfy a parameter constraint, you will see a message such as: `Path or method not defined in spec file: GET /path/style/simple/single/value/0` (the 0 here does not match the schema, which specifies the value must be `> 0`)|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/parameters)|
|Path parameters|P|Understands primitive parameters, and is able to apply schema validation to primitive data types e.g. restricting values between 1-10 for integers. Does not support array or objects.|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/parameters)|
|Query parameters|Y|Query parameters are proposed to be updated updated to cause failures in ​PACT-877: Query parameters not defined in OAS don't fail BDCT if defined in pactSelected for Development.See opt-out of legacy validation (TODO) NOTE: This feature is still under discussion and may not make the final cut.|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/parameters)|
|Headers|Y|||
|Bodies|P|Full schema support on JSON bodies only||
|Status codes|Y|||
|[Link](https://spec.openapis.org/oas/v3.1.0#link-object)|N|Ignored||
|[Tag](https://spec.openapis.org/oas/v3.1.0#tag-object)|N|Ignored||
|[Example](https://spec.openapis.org/oas/v3.1.0#example-object)|N|Ignored||
|[Discriminator](https://spec.openapis.org/oas/v3.1.0#discriminator-object)|P|`discriminator` usage has the following requirements and limitations: <ul> <li>`mapping` in discriminator object is not supported.</li> <li>"implicit" discriminator values are not supported.</li> <li>`oneOf` keyword must be present in the same schema.</li> <li>`discriminator` property should be `required` either on the top level, or in all `oneOf` subschemas.</li> <li>each `oneOf` subschema must have the `properties` keyword with `discriminator` property. The subschemas should be either inlined </li>or <li>included as direct references (only `$ref` keyword without any extra keywords is allowed).</li> <li>schema for `discriminator` property in each `oneOf` subschema must be `const` or `enum`, with unique values across all </li>subschemas. <li>Not meeting any of these requirements would fail schema compilation.</li> </ul>||


#### Keywords

See [Keyword Support](/docs/bi-directional-contract-testing/contracts/oas/keyword-support) for additional information on this.

|Feature|Supported|Example|
|--- |--- |--- |
|`anyOf`|Y|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/anyOf)|
|`anyOf`|Y|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/anyOf)|
|`allOf`|Y|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/inheritance)|

#### [Encoding / Content Types](https://spec.openapis.org/oas/v3.1.0#encoding-object)
|Feature|Supported|Description|Example|
|--- |--- |--- |--- |
|JSON|Y|Full support|[Example](https://github.com/pactflow/bdct-oas-examples/)|
|XML|P|We don’t currently supported parsing and checking XML bodies, against defined schemas. Checks the content-type matches.|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/xml)|
|`x-www-form-urlencoded` Request Bodies|N|We don’t currently supported parsing and checking URL encoded form bodies, against defined schemas. Checks the content-type matches.|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/forms)|
|`multipart/form-data`|N|We don’t currently supported parsing and checking multipart request bodies, against defined schemas. Checks the content-type matches.|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/forms)|

#### [Security Schemes](https://spec.openapis.org/oas/v3.1.0#security-scheme-object)
|Feature|Supported|Description|Example|
|--- |--- |--- |--- |
|[Security Requirement](https://spec.openapis.org/oas/v3.1.0#security-requirement-object)|Y|`apiKey`, `http`, `mutualTLS`, `oauth2`, `openIdConnect`|[Example](https://github.com/pactflow/bdct-oas-examples/tree/main/examples/security)|
|Basic|Y|Only checks the presence of an `Authorization` header.||
|API Key (cookie)|Y|||
|API Key (header)|Y|||
|Bearer|Y|Only checks the presence of an `Authorization` header||
|OpenID|P|The security scheme is allowed, but no additional checks are performed (e.g. checks for calls to a valid OIDC provider are not in scope, nor the checking of exchanged tokens)||
|OAuth|P|As per OpenID||
|[Flows](https://spec.openapis.org/oas/v3.1.0#oauth-flow-object)|P|Behaviour as above||
|MASSL|P|The security scheme is allowed, but no additional checks are performed (e.g. no certificate checking on the requests can be performed for validity)||
|Multiple authentication types|N|Currently only one security scheme can be applied and tested. Support for “OR” and “AND”.||
|Scopes|P|Allowed and ignored for the purposes of our checks||

### Pact Support

#### Features

|Feature|Supported|Description|
|--- |--- |--- |
|HTTP|Y|HTTP based interactions||
|Messages|N|Messages can’t be modelled appropriately in OpenAPI documents|
|Plugins|N|Interactions containing plugins or custom content|
|Matching Rules|N|Ignored. OAS schemas and types are the "matching rules" used in BDCT|

#### Pact Specification Versions
|Version|Supported|Description|
|--- |--- |--- |
|v1|Y|https://github.com/pact-foundation/pact-specification/tree/version-1|
|v1.1|Y|https://github.com/pact-foundation/pact-specification/tree/version-1.1|
|v2|Y|https://github.com/pact-foundation/pact-specification/tree/version-2|
|v3|Y|https://github.com/pact-foundation/pact-specification/tree/version-3|
|v4|Y|https://github.com/pact-foundation/pact-specification/tree/version-4|
