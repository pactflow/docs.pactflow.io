---
id: verifying-feature-pacts
title: Strategies for verifying feature pacts
---

When a new "feature" pact is created, there are a few ways you could bring that pact into the verification process so that the verification results get published back to PactFlow from your CI.

1. Manually add the feature branch to the consumerVersionSelectors, commit it, and then remove it once the feature is released.

    ```js
    consumerVersionSelectors: [
        { mainBranch: true },
        { branch: 'feat/new-field' },
        ...
    ]
    ```

    * This does the job, but it's a bit fiddly, and there are better options.

2. Make a matching feature branch in the provider, and dynamically fetch the pact for the matching consumer branch if it exists (no error will be raised if a pact does not exist for a particular branch). This is a reasonably common approach, where the two teams coordinate feature development using matching branch names.

    ```js
    consumerVersionSelectors: [
        { mainBranch: true },
        { branch: process.env.GIT_BRANCH },
        ...
    ]
    ```

3. Enable "work in progress" pacts - which is the recommended and option we will be proceeding with

## Work In Progress Pacts

The "work in progress pacts" feature solves the problem of provider teams having to manually update and commit changes to their verification configuration to publish verifications for feature pacts from CI.

When enabled, it will cause the provider to automatically verify, in pending mode, any "outstanding" pacts (ie. ones for which it has not yet published a successful result), as well as the pacts that were explicitly specified in the consumer version selector list (such as a specified `branch`).

A "work in progress" pact is a pact that is the latest for its branch that does not have any successful verification results (ie. is still pending) for the configured provider branch . At this stage in the exercise, the `feat/new-field` pact is still in pending state for the main branch of the provider, so it is considered a "work in progress" pact for `master`.

The verification task can be configured to automatically include work in progress pacts, so that the consumer team can get feedback on their changed pacts without having to wait on action from the provider team.

👉 Something that is important to understand about the calculation of the WIP pacts list is that it is *calculated based on the branch that will be applied to the provider version*. For example, if a pact only has a successful verification from a provider version with branch `feat/x`, it will still be pending for a provider version with main branch `master` (and every other branch).

The reason for this is that if support for a new feature pact is added on a `feat/x` branch of the provider, you still want to keep getting the failed verification results from `master` until the `feat/x` branch is merged.

## Commit our changes for the provider

1. Run `make test` and you will see that the `feat/new-field` pact has been included in the verifications, running in pending mode.
    * We use the `GIT_BRANCH` when running locally so that the WIP calculations know which pending pacts to include.

1. Commit and push your changes from the previous step, where we implemented our consumers requested changes in the provider codebase
   1. `git add . && git commit -m 'feat: implementing color' && git push`

1. Open the provider build in Github Actions and wait for the successful verification result for `feat/new-field` pact to be be published.

    * 👉 Note that the provider has now successfully deployed this change to production, so the consumer is now free to release their code.

2. On your local machine, run `make test` - you will now see that the `feat/new-field` pact is not included, as it is no longer a work in progress pact.

## Expected state by the end of this step

* A provider that implements the features required by the `feat/new-field` pact on its `master` branch.
* A passing provider build in Github Actions.
* The new version of the provider is "deployed" to production.
* A `feat/new-field` pact in PactFlow that has successful verification results from a version of the provider's main branch `master` and any deployed (or released versions) in our case `prod` environment.

## Conclusion

Enabling 'work in progress' pacts allows the consumer to get feedback on a changed pact without the provider having to make configuration changes on their end.

If the verification for the changed pact passes without the provider having to make any changes to the code, then the consumer is free to release their feature, without making the provider a bottleneck.

:::info

Using Work In Progress Pacts, is the most efficient way for consumer and providers to release changes independently and ensure all new pacts brought into the system (published with a valid branch) are verified without additional need to add new consumer version selectors.

Combined with enabling Pending pacts, the provider teams are not blocked, when new consumer expectations are created.

:::
