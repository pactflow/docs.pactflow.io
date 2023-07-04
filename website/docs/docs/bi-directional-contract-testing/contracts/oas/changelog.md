---
title: Changelog
sidebar_label: Changelog
---

## June 2023

* Support for V4 Pacts added
* Added full [RFC 9110: HTTP Semantics §12](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.1) support for content-types, content-negotiation and vendor specific media types
* Support for negative scenario testing

## July 2023

* Support for OAS 3.1
* As per JSON Schema [guidance](https://json-schema.org/understanding-json-schema/reference/numeric.html), numbers are not coerced into narrow types such as `int64`, `int32` and `float`, with support only for `number` and `integer`. Validation has been relaxed to accommodate this (see https://github.com/ajv-validator/ajv-formats/pull/22#issuecomment-808896823).
* `nullable` now requires use of `type`, see https://github.com/ajv-validator/ajv/blob/490eb8c0eba8392d071fef005e16d330f259d0ba/lib/compile/validate/dataType.ts#L26C66-L26C66.
* Transformations to OAS document applied to improve use of `anyOf`, `oneOf`, `allOf` and polymorphic payloads.
* Missing query strings default to an error, not a warning