---
id: how-to-break-everything
title: How to break everything
---

## Change the pact

Let's add a new field to the expectations we have for the product API. We're going to make the change on master, and it's going to break everything. This is an exercise in "what not to do, and why".

1. In your consumer codebase, open up `src/api.pact.spec.js`, scroll down to the first test, and in the `expectedProduct` definition, add a new field e.g. `color: "red"`.

1. Run `make test`. These tests should be green - the consumer code is consistent with its own expectations.
   <!-- should we have a note here, as the consumer code doesnt depend on this field, this is consumer drift?  -->

1. Commit and push the changes.

    👉 Note that in the `Makefile` file, the consumer version is tagged with the name of the git branch.

    ```bash
    publish_pacts: .env
     @echo "\n========== STAGE: publish pacts ==========\n"
    @"${PACT_CLI}" publish ${PWD}/pacts --consumer-app-version ${GIT_COMMIT} --tag ${GIT_BRANCH}
    ```

1. Open up the the consumer build in Github Actions. It will generate and publish the pact successfully, then fail on the `can-i-deploy` step, as there is no successful verification from the provider.

1. Open up the provider build in Github Actions. The changed pact will have triggered a pact verification build of the provider project. This will have failed, as the new field does not exist in the API. This particular failed build is expected, and not a problem, as the pact verification build is generally separate from the provider's normal pipeline. For a more detailed explanation of this see <https://github.com/pactflow/example-provider-legacy#pact-verifications>.

## Run the provider build

The real problem is that the provider is now unable to deploy from their master branch 😧.

This is because the provider is configured to verify the latest `master` pact, so publishing a pact with a new expectation and tagging its consumer version as `master` causes the verification step to fail, breaking the provider's build through no fault of its own.

You can demonstrate this by running a provider build in Github (`Actions` -> Under `Workflows`, select `Build` -> `Run workflow` -> `Run workflow`).

## Check the pact's status in PactFlow

1. Open up the pact in PactFlow. You'll see that there is a pact tagged `master` with a failed verification result.

1. Click on "VIEW PACT" and you'll see that each interaction has a status next to it.

1. Expand the failing interaction, and you'll see the field level mismatches.

## Expected state by the end of this step

* A consumer build that is failing at the `can-i-deploy` step in Github Actions.
* A provider build that is failing during verification in Github Actions.
* A `master` pact in PactFlow that has a failed verification result.

## Conclusion

Making changes to the pact on the master branch can break both consumer and provider builds, and may stop both projects from being able to deploy.
