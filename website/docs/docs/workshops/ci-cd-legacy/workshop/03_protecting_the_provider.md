---
id: protecting-the-provider
title: Protecting provider builds from changed pacts
---

Those familiar with automated testing frameworks have probably come across the term "pending tests". These are tests that have a particular flag on them that causes them (depending on the framework) to either be skipped, or if executed, to not fail the test suite.

When using Pact with Pactflow, we have a similar concept of a "pending pact". A pending pact is one which does not yet have a successful verification result published. Pending pacts can fail verification without causing the overall verification task (and hence, the overall provider build) to fail.

Once a pact has a successful verification result published, it is now considered to be an accepted/supported contract, and any subsequent failure can only be as a result of the provider itself changing. Once a pact has left pending state, verification failures *will* cause the provider build to fail.

Something important to note about the pending calculation is that *it is based on the branch for the provider version*. For example, once a pact has a successful verification from a provider version with branch `master`, it will cease to be pending for subsequent `master` versions, but would still be pending for a `feat/x` branch of the provider (until the first successful `feat/x` verification was published, etc.)

For further reading: <https://docs.pact.io/pending>

## Enable 'pending pacts' for the provider

1. In `product/product.pact.test.js`, set `enablePending: true` in the options for the dynamically fetched pacts.

1. Run `GIT_BRANCH=master make test` - note that this now passes ✅

    👉 Whenever we run the verification step with the pending feature enabled, we have to make sure we've set the branch correctly (which we do in this codebase by providing the environment variable `GIT_BRANCH` to `providerVersionBranch` in our test `product/product.pact.test.js`), because the pending status for each pact depends on it.

1. Commit and push, and open up the build in Github Actions.

    👉 The test output indicates that the `master` pact is in pending mode, so even though its verification fails, the overall build still passes.

    👉 The provider is still compatible with pact deployed to the `prod` environment , so the deploy step is able to proceed without issue.

1. In Pactflow, refresh the pact page.

    👉 Even though the provider build is passing, the `master` pact has a (correctly) failed verification result, which tells the consumer team that they cannot deploy the code associated with this pact yet.

## Make a breaking change to the provider

Let's see what happens if the provider makes a change that would break its contract with the production version of the consumer. The pact deployed to the `prod` environment is not in pending mode, as it already has a successful verification result published. This means that a failure for the `prod` pact verification *will* fail the overall verification task.

1. Make a change to the provider that would cause the production pact to fail.
    * An easy way to do this is to open up `product/product.js` and change `this.id` to `this.uuid`.

1. Run `GIT_BRANCH=master make test` - note that this now fails ❌

  A developer would typically run all the tests before pushing, so this change would most likely never even make it into the codebase. However, even if they did push this change, the build would fail and stop before it got to the deployment stage, ensuring that the production consumer could not be broken by an unintentional deployment of this version of the provider.

1. Discard your changes.

## Expected state by the end of this step

A provider build that is passing and still deploying to production, with a failing `master` pact in pending state.

## Conclusion

Enabling the pending pacts feature for verifications stops changed pacts from breaking provider builds, allowing the provider to deploy to production if it is still compatible with the prod pact, while ensuring that the provider cannot make changes that break existing consumers.
