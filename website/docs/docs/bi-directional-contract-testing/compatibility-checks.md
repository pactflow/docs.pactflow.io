---
title: Compatibility Checks (breaking change detection)
sidebar_label: Compatibility Checks
---

When BDC contracts are published to Pactflow, the consumer contract (Pact file) will be verified against the Open API Specification (OAS).
In essence, Pactflow will ensure that the consumer contract is a subset of what is in the OAS. I.e., it will check that all the interactions in the Pact file are valid for that OAS.

:::note

Pactflow can only make a determination based on the information it receives. If the consumer contract does not contain all the 
interactions the consumer uses, then the resulting checks may say it is safe to deploy when it could not be because the missing API
calls may have breaking changes.

:::

The [detail screen](../user-interface/bi-directional) for the BDC interaction has different tabs that display the contracts involved and the status of the verification. The interaction could be in an invalid (or failed) state due to the following three conditions:

1. The provider self-verification test results indicate that they have failed. This means that the provider build ran some tests against the OAS and the result was a failure.
2. The consumer Pact verification results have failed. This means the consumer Pact tests failed, and the consumer is not compatible with the published Pact file.
3. The consumer Pact file is not compatible with the OAS.

## Contract Comparison

This tab will display the details of the comparison between the Pact file and the OAS.

