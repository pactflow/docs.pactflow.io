---
title: Compatibility Checks (breaking change detection)
sidebar_label: Compatibility Checks
---

When BDC contracts are published to Pactflow, the consumer contract (Pact file) will be verified against the Open API Specification (OAS).
In essence, Pactflow will ensure that the consumer contract is a subset of what is in the OAS. I.e., it will check that all the interactions in the Pact file are valid.

:::note

Pactflow can only make a determination based on the information it receives. If the consumer contract does not contain all the 
interactions the consumer uses, then the resulting checks may say it is safe to deploy when it could not be because the missing API
calls may have breaking changes.

:::
