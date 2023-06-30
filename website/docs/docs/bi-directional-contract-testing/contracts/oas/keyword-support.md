---
title: Keyword Support
sidebar_label: Keyword Support
---

## Support for OpenAPI Keywords

OpenAPI contracts may contain the logical keywords `anyOf`, `allOf`, and `oneOf` in schema definitions, which are used to support rich domain models, or validate a value against multiple criteria. This section explains in a little more detail how we approach handling these keywords in PactFlow.

From JSON Schema [website](https://json-schema.org/understanding-json-schema/reference/combining.html), these can be summarised as:

* `allOf`: (AND) Must be valid against all of the subschemas
* `anyOf`: (OR) Must be valid against any of the subschemas
* `oneOf`: (XOR) Must be valid against exactly one of the subschemas

## Examples

This [project](https://github.com/pactflow/example-bdct-logical-keywords) contains worked examples for keyword support, as well as various other OpenAPI use cases.

## The `allOf` keyword

The primary use case for `allOf` is the ability to reuse types via [composition, inheritence and polymorphism](https://spec.openapis.org/OpenAPI/v3.1.0#schemaComposition).

The following [example](https://spec.openapis.org/OpenAPI/v3.1.0#models-with-polymorphism-support) is taken from the OpenAPI specification, in order to demonstrate the common use case for composition, inheritance and polymorphism. It specifies `Cat` and `Dog` types, which extends a general `Pet` base type. This schema could be used in a response payload, communicating the possible types an endpoint may return.

```yaml
components:
  schemas:
    Pet:
      type: object
      discriminator:
        propertyName: petType
      properties:
        name:
          type: string
        petType:
          type: string
      required:
      - name
      - petType
    Cat:  ## "Cat" will be used as the discriminator value
      description: A representation of a cat
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          huntingSkill:
            type: string
            description: The measured skill for hunting
            enum:
            - clueless
            - lazy
            - adventurous
            - aggressive
        required:
        - huntingSkill
    Dog:  ## "Dog" will be used as the discriminator value
      description: A representation of a dog
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          packSize:
            type: integer
            format: int32
            description: the size of the pack the dog is from
            default: 0
            minimum: 0
        required:
        - packSize
```

To validate JSON against an `allOf` definition, the data must be valid against _all_ of the given subschemas.

The following JSON body would pass this validation:

```json
{
  "name": "Rusty",
  "petType": "Dog",
  "packSize": 7
}
```

These are able to work because the defined schemas are "open" by default. What does "open" mean?

### Open Schemas and `additionalProperties`

From https://json-schema.org/understanding-json-schema/reference/object.html#additional-properties:

> The [`additionalProperties`](https://json-schema.org/understanding-json-schema/reference/object.html#additional-properties) keyword is used to control the handling of extra stuff, that is, properties whose names are not listed in the `properties` keyword or match any of the regular expressions in the `patternProperties` keyword. By default any additional properties are allowed.

This last statement is what we should pay attention to - by default, additional properties are _allowed_. This is what allows the use case above to work. 

`packSize` is not a property defined in the `Pet` schema, and `name` and `petType` are not defined in the `Dog` schema but as `additionalProperties` are allow by default, the JSON payload matches both branches of the `allOf` schema _independently_.

Let's explore this a little more with a simpler example to better illustrate the point.

#### Example

Given this schema:

```yaml
allOf:
  - title: time
    type: object
    properties:
      time:
        type: string
  - title: date
    type: object
    properties:
      date:
        type: string
```

With an open schema (as above), the following JSON will pass the validation

```json
{
  "time": "08:15:00+06:00",
  "date": "2022-01-22"
}
```
and so will
```json
{
  "date": "2022-01-22"
}
```
and
```json
{
  "temperature": 25,  // <- wait, where did temperature come from?
  "unit": "C"         // ...and this!
}
```
and, funnily enough,
```json
{}
```
This does not pass, because date is not a string:
```json
{
  "temperature": 25,
  "unit": "C",
  "date": 22  // <- not a string!
}
```
Adding the `required` keyword to the 2 properties on the schema improves things a bit
```yaml
allOf:
  - title: time
    type: object
    properties:
      time:
        type: string
    required:
      - time
  - title: date
    type: object
    properties:
      date:
        type: string
    required:
      - date
```
the new minimum JSON is narrowed to

```json
{
  "time": "08:15:00+06:00",
  "date": "2022-01-22"
}
```

But you can still add other arbitrary properties - and this is problematic for testing tools like PactFlow.

### PactFlow does not allow "open" schemas

In most cases on the Internet you won’t see “closed” schemas because OpenAPIs primary use case is documentation and SDK generation where this doesn't really matter. Closing the schema also prevents these important scenarios.

If you consider what PactFlow's job is, however, it is to prevent a consumer expecting something that provider cannot support! If the consumer needs the property that is not present in the schema, we need to be able to detect this situation and prevent it.

Therefore, PactFlow must set `additionalProperties` to `false` on response bodies, otherwise we would provide false positives and a useless feature.

:::tip
PactFlow automatically closes all schemas
:::

As noted, this has the unfortunate side effect of breaking the original example and use case above. By disallowing additional properties on each schema, we end up with this unfortunate situation:

```json
{
  "name": "Rusty",  // ✅ Matches the Pet schema, ❌ but not Dog
  "petType": "Dog", // ✅ Matches the Pet schema, ❌ but not Dog
  "packSize": 7     // ❌ Does not match the Pet schema, ✅ matches Dog 
}
```

To work around this issue, we use a relatively new JSON schema feature called [`unevaluatedProperties`](https://json-schema.org/understanding-json-schema/reference/object.html#unevaluated-properties) on all `allOf` schemas. This has the effect of extending the closed schemas, allowing us to treat the `allOf` as if it were a single schema and :tada:.


## `oneOf` and `anyOf`

These keywords enjoy support out of the box, without additional caveats as per above.

## Transformations PactFlow applies to OpenAPI documents

Following the discussion in `allOf`, in order for PactFlow to perform its compatibility checks, support these keywords and other OpenAPI [features](/docs/bi-directional-contract-testing/contracts/oas/features), it needs to perform a number of transformations on the document prior to validation.

The transformations it applies, are as follows:

1. Sets `additionalProperties` in your OpenAPI to `false` on any response body, to ensure a consumer won't get false positives if they add a new field that isn't actually part of the spec.
1. Removes `required` properties from provider responses, as otherwise all consumers would be required to consume the entire provider response!
1. Sets [`unevaluatedProperties: true`](https://json-schema.org/understanding-json-schema/reference/object.html#unevaluated-properties) on `allOf` schemas. This has the effect of extending the (guaranteed to be) closed schemas after (1), allowing us to match against a single composite schema
1. Ensures any polymorphic types both have a `discriminator` and have an `enum` set on it to restrict the possible sub-types

The consequences of the above transformations are:

1. The transformed OpenAPI will be slighly different to what you provided to PactFlow
2. Additional validations will be performed that may pass other tools (such as the [Swagger Editor](https://editor.swagger.io/))
3. The `allOf` semantics are slightly modified as described above.