---
id: run-the-consumer-tests
title: Run the consumer tests
---

Shut down the consumer and provider by pressing `ctl+c` in each of the terminals.

In the consumer project, run:

```
make test
```

This will run the test suite for the consumer codebase. The pact tests in `src/api.pact.spec.js` generate a pact file (the contract) which can be found in `pacts/pactflow-example-consumer-pactflow-example-provider.json`. As you can see from the test output, pacts are not published when running tests on your local machine.

<!-- This file has been synced from the pactflow/docs.pactflow.io repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

