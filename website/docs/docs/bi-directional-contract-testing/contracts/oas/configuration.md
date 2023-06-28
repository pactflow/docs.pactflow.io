---
title: Configuration
sidebar_label: Configuration
---

## Validation Configuration

You can control the behaviour of several validation and comparison rules by setting 

## Dereferencing `$ref`s

Tell PactFlow not to dereference `$ref`s.

## Inlining schemas

Tell PactFlow not to inline schemas. Where an `allOf` is specified, any content must match _all_ of the provided schemas independently. 

## Query Strings

By default, query parameters referenced in the consumer contract that are not present in the OAS will result in an error. You can configure this to be a warning by enabling this setting.

## `additionalProperties`

`additionalProperties` is always set to `false` on schemas, to prevent false positives. Set this to `true` to disable this behaviour.

:::warning
We highly recommend not adjusting this setting. Setting this property to `true` on response bodies will allow any pact bodies to pass - we hope you know what you're doing!
:::