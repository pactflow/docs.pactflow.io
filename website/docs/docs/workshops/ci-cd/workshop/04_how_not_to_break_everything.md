---
id: how-not-to-break-everything
title: How not to break everything
---

When we made first made the change to the pact on the master branch of the consumer, we ended up with broken consumer build, stopping them from being released, and without pending pacts, the provider would have been blocked. In the previous step, we learned how to configure the provider so that it could still continue to be released, even if it was not able to successfully verify the new pact.

The consumer is still unable to make a release from its master however, as the `can-i-deploy` step correctly identifies that the verification for the `master` pact has failed. This is a correct report on the state of this integration - the API does not yet implement the features we require to deploy.

Let's make our changes on a branch this time.

1. In the consumer codebase, revert the change to master and push to make the build go green again.

    ```
    git revert HEAD
    git push
    ```

1. Create a new branch

    ```
      git checkout -b feat/new-field
    ```

1. open up `src/api.pact.spec.js`, scroll down to the first test, and in the `expectedProduct` definition, add a new field e.g. `color: "red"`.

1. Make sure the tests pass locally by running `make test`.

1. Commit & Push your changes by running
   1. `git add src/api.pact.spec.js`
   2. `git commit -m 'feat: add color'`
   3. `git push --set-upstream origin feat/new-field`
    * The consumer tests will pass, and then the CI build will fail as `can-i-deploy` correctly identifies that this branch is not yet compatible with the API (there is no verifications against this changed pact content, and therefore the provider must verify it).
      * Our pact associated with the feature branch `feat/new-field` will be unverified and the consumer cannot deploy this feature branch until the provider implements the feature.
    * The webhook-triggered pact verification provider build will be triggered
      * It will verify the changed pact against the latest providers main branch and any deployed (or released) in production
      * It will fail, that's ok, as it wouldn't stop the provider from deploying as we have enabled the `pendingPacts` feature
      * Our pact associated with the feature branch `feat/new-field` will be verified as incompatible and the consumer cannot deploy.
      * If we re-run our can-i-deploy step of the failed consumer build, we will see it will now show a failed verification.

👉 The `can-i-deploy` step acts as a "can I merge?" check when run from a branch. We'll know we're safe to merge this branch into master if/when `can-i-deploy` passes. 👈

## Expected state by the end of this step

* In Github Actions:
  * A `master` consumer build that passes and deploys.
  * A `feat/new-field` consumer build that fails at `can-i-deploy`.
* In PactFlow:
  * A `master` pact with a successful verification result.
  * A `feat/new-field` pact with a failed verification result

## Conclusion

By making changes on a branch of the consumer, and publishing a 'feature pact', we keep our main release branch green, and make sure we're not blocked from deploying. The `can-i-deploy` call acts as a "can I merge?" check when we're on a branch.
