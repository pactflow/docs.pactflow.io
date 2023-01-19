---
id: protecting-the-provider
title: Protecting provider builds from changed pacts
---

Those familiar with automated testing frameworks have probably come across the term "pending tests". These are tests that have a particular flag on them that causes them (depending on the framework) to either be skipped, or if executed, to not fail the test suite.

When using Pact with Pactflow, we have a similar concept of a "pending pact". A pending pact is one which does not yet have a successful verification result published. Pending pacts can fail verification without causing the overall verification task (and hence, the overall provider build) to fail.

Once a pact has a successful verification result published, it is now considered to be an accepted/supported contract, and any subsequent failure can only be as a result of the provider itself changing. Once a pact has left pending state, verification failures *will* cause the provider build to fail.

Something important to note about the pending calculation is that *it is based on the branch for the provider version*. For example, once a pact has a successful verification from a provider version with branch `master`, it will cease to be pending for subsequent `master` versions, but would still be pending for a `feat/x` branch of the provider (until the first successful `feat/x` verification was published, etc.)

For further reading: <https://docs.pact.io/pending>

## Change the pact

Let's add a new field to the expectations we have for the product API. We're going to make the change on master, and it's going to break our consumer build, as it won't be compatible with our provider. This is an exercise in "what not to do, and why".

1. In your consumer codebase, open up `src/api.pact.spec.js`, scroll down to the first test, and in the `expectedProduct` definition, add a new field e.g. `color: "red"`.

1. Run `make test`. These tests should be green - the consumer code is consistent with its own expectations.
   <!-- should we have a note here, as the consumer code doesnt depend on this field, this is consumer drift?  -->

1. Commit and push the changes.

    👉 Note that in the `Makefile` file, the consumer version is associated with the name of the git branch.

    ```bash
    publish_pacts: .env
     @echo "\n========== STAGE: publish pacts ==========\n"
    @"${PACT_CLI}" publish ${PWD}/pacts --consumer-app-version ${GIT_COMMIT} --branch ${GIT_BRANCH}
    ```

1. Open up the the consumer build in Github Actions. It will generate and publish the pact successfully, then wait for a period of time and then fail on the `can-i-deploy` step, as there is no successful verification from the provider.

1. Open up the provider build in Github Actions. The changed pact will have triggered a pact verification build of the provider project. This will have failed, as the new field does not exist in the API. This particular failed build is expected, and not a problem, as the pact verification build is generally separate from the provider's normal pipeline. For a more detailed explanation of this see <https://github.com/pactflow/example-provider#pact-verifications>.

## Check the pact's status in Pactflow

1. Open up the pact in Pactflow. You'll see that there is a pact associated with branch `master` with a failed verification result.

1. Click on "VIEW PACT" and you'll see that each interaction has a status next to it.

1. Expand the failing interaction, and you'll see the field level mismatches.

## Expected state by the end of this step

* A consumer build that is failing at the `can-i-deploy` step in Github Actions.
* A provider build that is failing during verification in Github Actions.
* A pact associated with the consumers main branch `master` in Pactflow that has a failed verification result.

## Run the provider main branch build

When a provider build runs, it is configured to verify the latest pact of any registered consumers main branch, so publishing a pact with a new expectation and associating its consumer version as `master` (the consumers main branch) will report a (correctly) failed verification result, which stopped our consumer from deploying. Our provider is still compatible with its deployed consumer(s) and therefore is safe to deploy. We use the `Pending pacts` feature of Pact to aid us.

You can demonstrate this by running a provider build in Github (`Actions` -> Under `Workflows`, select `Build` -> `Run workflow` -> `Run workflow`).

 👉 The test output indicates that the `master` pact is in pending mode, so even though its verification fails, the overall build still passes.

 👉 The provider is still compatible with pact deployed to the `prod` environment , so the deploy step is able to proceed without issue.

1. Look at [src/product/product.providerChange.pact.test.js](https://github.com/pactflow/example-provider/blob/master/src/product/product.providerChange.pact.test.js), `enablePending: true` is set in the options for the dynamically fetched pacts.

1. Locally you can run `make test` - note that this passes ✅

    👉 Whenever we run the verification step with the pending feature enabled, we have to make sure we've set the branch correctly (which we do in this codebase by providing the environment variable `GIT_BRANCH` to `providerVersionBranch` in our test `product.providerChange.pact.test.js`), because the pending status for each pact depends on it.

1. In Pactflow, refresh the pact page.

    👉 Even though the provider build is passing, the `master` pact has a (correctly) failed verification result, which tells the consumer team that they cannot deploy the code associated with this pact yet.

## Disable 'pending pacts' for the provider

::: info
this step is optional and for demonstration purposes to show what happens without the `Pending pacts` feature
:::

1. In [src/product/product.providerChange.pact.test.js](https://github.com/pactflow/example-provider/blob/master/src/product/product.providerChange.pact.test.js), set `enablePending: false` in the options for the dynamically fetched pacts.

2. Run `make test` - note that this now fails ❌

    👉 Without the `Pending pacts` feature, the teams would now be at a stale-mate.
    * The `master` pact has a (correctly) failed verification result, which tells the consumer team that they cannot deploy the code associated with this pact yet.
    * The provider is verifying the code from its main branch to deploy, against the consumers `master` branch, and any `deployed` versions, and the verification job now fails, meaning the provider is blocked from deployed to production through no fault of their own. We will show how the consumer can safely deliver this change later in the workshop

:::warn
The real problem is that the provider is now unable to deploy from their master branch 😧.

This is because the provider is configured to verify the latest pact of any registered consumers main branch, so publishing a pact with a new expectation and associating its consumer version as `master` (the consumers main branch) causes the verification step to fail, breaking the provider's build through no fault of its own.
:::

## Make a breaking change to the provider

The consumer is protected from deploying a change incompatible with the `master` and `deployed` provider, and the provider is protected from incoming changes from the consumer.

Let's see what happens if the provider makes a change that would break its contract with the production version of the consumer. The pact deployed to the `prod` environment is not in pending mode, as it already has a successful verification result published. This means that a failure for the `prod` pact verification *will* fail the overall verification task.

1. Make a change to the provider that would cause the production pact to fail.
    * An easy way to do this is to open up `product/product.js` and change `this.id` to `this.uuid`.

1. Run `GIT_BRANCH=master make test` - note that this now fails ❌

  A developer would typically run all the tests before pushing, so this change would most likely never even make it into the codebase. However, even if they did push this change, the build would fail and stop before it got to the deployment stage, ensuring that the production consumer could not be broken by an unintentional deployment of this version of the provider.

1. Discard your changes.

## Expected state by the end of this step

A provider build that is passing and still deploying to production, with a failing `master` pact in pending state.

## Conclusion

Making changes to the pact on the consumers main branch can break both consumer and provider builds, and may stop both projects from being able to deploy.

Enabling the pending pacts feature for verifications stops changed pacts from breaking provider builds, allowing the provider to deploy to production if it is still compatible with the prod pact, while ensuring that the provider cannot make changes that break existing consumers.
