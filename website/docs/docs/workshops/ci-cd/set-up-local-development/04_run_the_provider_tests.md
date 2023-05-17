---
id: run-the-provider-tests
title: Run the provider tests
---

When we run the provider verification step on a local development machine, we do not publish the verification results. This is why we only need a read only token for development work. Your CI/CD system would use a [system account](https://docs.pactflow.io/docs/user-interface/settings/users/#system-accounts) and a read/write token to publish results.

1. Go to the `Settings > API Tokens` page in your PactFlow account
2. Find the section `Read Only token`
3. select `COPY ENV VARS` - this will pre-populate the next code snippet for you
4. Create a `.env` file in the root of your provider project and paste the contents into the file - it should look something like the following:

```bash
PACT_BROKER_BASE_URL=<the base URL of your PactFlow account>
PACT_BROKER_TOKEN=<the read only token you copied from your settings page>
```

Then run:

```bash
make test
```

This runs the test suite for the provider codebase. The pacts for this provider are verified in `product/product.pact.test.js`.

It is configured to fetch the latest pacts for this provider that have been published from consumer(s) main branches, and the pacts for the application versions that are currently deployed via [Consumer Version Selectors](https://docs.pact.io/pact_broker/advanced_topics/consumer_version_selectors).

The recommended setup is [here](https://docs.pact.io/provider/recommended_configuration#consumer-version-selectors) and used in this workshop.

The tests should pass!

You now have your local development environment setup, for both the consumer and provider side, and can publish pacts, and verify them.

You are now ready for the advanced workshop where you will get to understand how Pact provides approaches for implementing new features for an integration following a "consumer driven contracts" process, while ensuring continuous delivery is supported.
