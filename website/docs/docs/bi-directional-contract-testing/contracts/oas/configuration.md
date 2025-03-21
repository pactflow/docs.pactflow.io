---
title: Configuration
sidebar_label: Configuration
---

Behaviour of the comparison checks can be customised by the use of [OpenAPI extensions](https://swagger.io/docs/specification/v3_0/openapi-extensions/). 

The extensions follow the format: `x-opc-config-${extension}` where `extension` matches one of the items below. It must be added to the `info` section of your OAS to be recognised by PactFlow. For example, to customise the Base URL for comparisons you would do the following:

```yml
openapi: 3.1.0
info:
  x-opc-config-base-path: /custom-prefix
  title: OAS
  version: 1.0.0

paths:
  /path:
    get:
      responses:
        "200":
          description: ok
```

This will result in checks matching the path `/custom-prefix/path`, rather than simply `/path`.

## Configuration Options

| Extension | Default Value |Description|Example|
|--- |--- |--- |--- |
| `x-opc-config-cast-objects-in-pact` | `true` | Compatibility mode. Previously "[object Object]" queries were validated as objects,
  rather than flag it as a string - suggesting a broken Pact file |  |
| `x-opc-config-disable-multipart-formdata` | `true` | Compatibility mode. Disables validation of multipart forms. | |
| `x-opc-config-ignore-duplicate-slashes` | `true` | Compatibility mode. Duplicate slashes (e.g. `//`) were treated as a single slash. | `//` will be treated as `/` if enabled |
| `x-opc-config-ignore-trailing-slash` | `true` | Compatibility mode. Trailing slashes  | `/foo` and `/foo/` will be considered the same if enabled. |
| `x-opc-config-legacy-parser` | `true` | Compatibility mode. | EXAMPLE |
| `x-opc-config-no-authorization-schema` | `true` | Compatibility mode. Do not check value against schema | `Authorization: Bearer !@#$%^&` or `Authorization: Basic abc` will pass if enabled |
| `x-opc-config-no-percent-encoding` | `true` | Compatibility mode. Allows percentages in path, even if it is not percent encoded | TODO |
| `x-opc-config-no-transform-non-nullable-response-schema` | `true` | Compatibility mode. | EXAMPLE |
| `x-opc-config-no-validate-complex-parameters` | `true` | Compatibility mode. | EXAMPLE |
| `x-opc-config-no-validate-request-body-unless-application-json` | `true` | Compatibility mode. | EXAMPLE |
| `x-opc-config-base-path` | `undefined` | In [OAS 3 (and also 2)](https://swagger.io/docs/specification/api-host-and-base-path/), all API endpoints are considered to be relative to the base URL. For example, assuming the base URL of `https://api.example.com/v1`, the `/users` endpoint refers to `https://api.example.com/v1/users`. As the base URL may be specifiedi as an array, and in multiple nested levels within the document, there is no reliable way to determine the correct URL. This item allows you to specify the value for the purposes of validation.  | `/custom-prefix` |

TODO: need to make these user friendly above
```
  // SMV used node:querystring to parse query strings and
  // application/x-www-form-urlencoded form bodies. This had a limitation that
  // nested objects/arrays are not parsed correctly
  ["legacy-parser", quirks],

  // SMV had a bug whereby nullable response schemas were not transformed
  // correctly. It was missing a transformation to set additionalProperties to
  // false. This flag reproduces the bug.
  ["no-transform-non-nullable-response-schema", quirks],

  // SMV only validated schemas of arrays and objects in path, headers, and
  // query params
  ["no-validate-complex-parameters", quirks],

  // SMV had a bug whereby request bodies of *any* content-type are not
  // validated unless application/json is in the list of supported request
  // content types
  ["no-validate-request-body-unless-application-json", quirks],
```


