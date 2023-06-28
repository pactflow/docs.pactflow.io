---
title: Keyword Support
sidebar_label: Keyword Support
---
## Support for OAS Keywords

OAS contracts may contain logical keywords `anyOf`, `allOf`, and `oneOf`, which are used to create a complex schema, or validate a value against multiple criteria. 



## Examples

This [project](https://github.com/pactflow/example-bdct-logical-keywords) contains worked examples for keyword support, as well as various other OAS use cases.

## Manual support

If you choose to [opt-out](./configuration) of the default matching behaviour, you will need to ensure your OAS is setup correctly. The following section describes the changes required to support each keyword.

### allOf

Because PactFlow sets `additionalProperties` to `false` on response bodies, `allOf` cannot be used to validate a response body against multiple schemas, unless the expected body passes validation on each of the schemas independently.

See this [write up](https://bitbucket.org/atlassian/swagger-mock-validator/src/master/FAQ.md) on this specific issue. 
 
To work around this issue, you should:

1. Dereference all `$refs`
2. Inline all of the `allOf` schemas. This has the effect of matching against a single schema, and won't cause issues with the `additionalProperties` check.

See this [example OAS](https://github.com/pactflow/bdct-oas-examples/blob/5b8a57c2309a405909d2d8bc6a45176d127e3260/examples/inheritance/inheritance.oas.yml#L26) with the necessary modifications.

This can be accomplished using packages such as [json-schema-merge-allof](https://www.npmjs.com/package/json-schema-merge-allof) and [json-schema-resolve-allof](https://www.npmjs.com/package/json-schema-resolve-allof).

An example NodeJS script using the above packages is as follows:


```js
const $RefParser = require("@apidevtools/json-schema-ref-parser");
const resolveAllOf = require("json-schema-resolve-allof");
const fs = require("fs");


const myArgs = process.argv.slice(2);

const inputSchema = myArgs[0];
const outputSchema = "resolved.json";
(async () => {
  try {
    // Deref all $refs
    const schema = await $RefParser.dereference(inputSchema);

    // Inline all allOfs
    const resolved = resolveAllOf(schema);

    fs.writeFileSync(outputSchema, JSON.stringify(resolved))
  } catch (err) {
    console.error(err);
  }
})();
```

You can then run the file `node ./index.js <path-to-oas-file>`.


### oneOf, anyOf
There is limited support for the `anyOf` and `oneOf` keywords. To compare the `anyOf` or `oneOf` schema with a response body from a pact contract you must:

- Ensure the `type` of the bodies match
- If the type of the body is `object` the object's fields need to be marked as `required`. Fields not marked as required will not be considered in the comparison and will not cause the integration to fail. It is recommended to mark all fields that the consumer will use as `required` in the OAS schema used for Bi-Directional Contract Testing.
- It is recommended to programmatically dereference and inline `$refs` in the OAS document uploaded to PactFlow, as they can cause issues when verifying `nullable` fields and nested `$refs` can not be accurately compared with a pact file. This can be accomplished using packages such as [json-schema-merge-allof](https://www.npmjs.com/package/json-schema-merge-allof) and [json-schema-resolve-allof](https://www.npmjs.com/package/json-schema-resolve-allof) (works for anyOf and oneOf as well).
- Set `additionalProperties` to `true` where a schema is referenced (not _on_ the referenced schema) or used in list of possible schemas via logical keywords

See this [`anyOf` example](https://github.com/pactflow/bdct-oas-examples/blob/5b8a57c2309a405909d2d8bc6a45176d127e3260/examples/anyOf/anyOf.oas.yml#L28) and [`oneOf` example](https://github.com/pactflow/bdct-oas-examples/blob/5b8a57c2309a405909d2d8bc6a45176d127e3260/examples/oneOf/oneOf.oas.yml#L26) with the necessary modifications.
