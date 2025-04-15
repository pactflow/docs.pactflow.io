---
title: Configuration
sidebar_label: Configuration
---

You can customize the behavior of the comparison checks using [OpenAPI extensions](https://swagger.io/docs/specification/v3_0/openapi-extensions/). 

The extensions follow the format: `x-opc-config-${extension}`, where `extension` matches one of the items below. You must add it to the `info` section of your OAS to be recognized by PactFlow. For example, to customize the Base URL for comparisons, you must do the following:

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

With the introduction of a new comparison engine (April 2025), we added additional capabilities to PactFlow.

Some of the changes are backwards incompatible with the previous engine and have been disabled by default to prevent unexpected build failures. The table below describes the options available. 

### Categories of options

1. **Compatibility mode** - items labelled "compatibility mode" indicate a new (and likely, improved) behaviour has been suppressed to ensure it remains consistent with the previous behaviour. 
2. **Bugs** - items labelled "bug" indicate a bug in the previous engine - these are almost certainly supressing a genuine issue, and should be disabled as soon as possible.
3. **Behaviour** - items labelled "behaviour" indicate a preference for how the tool should behave under certain conditions.


### Options

| Option | Default Value |Description|Example|
|--- |--- |--- |--- |
| `x-opc-config-cast-objects-in-pact` | `true` | Bug. The previous engine interpreted the literal string `"[object Object]"` in request query strings as empty objects (`{}`). This indicates an issue with an invalid pact file. |  |
| `x-opc-config-disable-multipart-formdata` | `true` | Compatibility mode. Disables validation of multipart forms. Setting this to true ignores all multipart request/response bodies during in validation. | |
| `x-opc-config-ignore-duplicate-slashes` | `true` | Compatibility mode. Duplicate slashes (e.g. `//` or `///`) are treated as a single slash. | `//` will be treated as `/` if enabled. |
| `x-opc-config-ignore-trailing-slash` | `true` | Compatibility mode. Trailing slashes. | `/foo` and `/foo/` will be considered the same if enabled. |
| `x-opc-config-legacy-parser` | `true` | Compatibility mode. Supports nested query string objects and key/value pairs in `x-www-form-urlencoded` bodies for more complicated schemas. | `a.b=c is parsed as { "a.b": "c" } in compatibility mode, otherwise { "a" : { "b": "c: } }` and `a[b]=c is parsed as { "a[b]": "c" } in compatibility mode, otherwise { "a" : { "b": "c: } } OPC` and `a=1,2 is parsed as { "a": "1,2" } in compatibility mode, otherwise { "a": ["1", "2"] }`. |
| `x-opc-config-no-authorization-schema` | `true` | Compatibility mode. Disables validation against schema. | `Authorization: Bearer !@#$%^&` or `Authorization: Basic abc` will pass if enabled. |
| `x-opc-config-no-percent-encoding` | `true` | Compatibility mode. Allows percentages in path, even if it is not percent encoded. |  |
| `x-opc-config-no-transform-non-nullable-response-schema` | `true` | Bug. The previous engine had a bug whereby nullable response schemas were not transformed correctly. |  |
| `x-opc-config-no-validate-complex-parameters` | `true` | Compatibility mode. | Given the header `Some-JSON-Header: "foo=bar&baz=bat..."`, the value will be deserialised into an object with properties `foo` and `baz` to be compared to the schema. |
| `x-opc-config-no-validate-request-body-unless-application-json` | `true` | Bug. The previous engine ignored body matching if the schema didn't include `application/json` in the list of supported request content types. |  |
| `x-opc-config-base-path` | `undefined` | Behaviour. In [OAS 3 (and also 2)](https://swagger.io/docs/specification/api-host-and-base-path/), all API endpoints are considered to be relative to the base URL. For example, assuming the base URL of `https://api.example.com/v1`, the `/users` endpoint refers to `https://api.example.com/v1/users`. As the base URL may be specified as an array, and in multiple nested levels within the document, there is no reliable way to determine the correct URL. This item allows you to specify the value for the purposes of validation.  | `/custom-prefix` |