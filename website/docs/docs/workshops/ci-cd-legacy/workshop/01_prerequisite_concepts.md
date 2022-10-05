---
id: prerequisite-concepts
title: Prerequisite concepts
---

Before we start, let's do a brief overview of a couple of key Pact/Pact Broker concepts that you'll need to understand to get the most out of the workshop.

## Branches

Branches in the Pact Broker are designed to model repository (git, svn etc) branches. A branch in the Pact Broker belongs to a pacticipant (application). A branch may have many pacticipant versions, and a pacticipant version may belong to many branches (but typically, it will belong to just one). A pacticipant version in the Pact Broker should map 1:1 to a commit in your repository.

Branches are used to make sure we are verifying the right pacts, and to facilitate this, the version number used to publish pacts and verification results should either [be or contain the commit](https://docs.pact.io/getting_started/versioning_in_the_pact_broker#guidelines), alongside setting the Branch property on upload.

In the [Makefile](https://github.com/pactflow/example-consumer-legacy/blob/master/Makefile) file in the consumer project, we associate the consumer app version with the name of the branch when we publish the pacts.

```bash
publish_pacts:
  @"${PACT_CLI}" publish ${PWD}/pacts --consumer-app-version ${GIT_COMMIT} --branch ${GIT_BRANCH}
```

You can also automatically detect the repository branch from known CI, environment variables or git CLI. Supports Buildkite, Circle
                CI, Travis CI, GitHub Actions, Jenkins, Hudson, AppVeyor, GitLab, CodeShip, Bitbucket and Azure DevOps.

You can see in this command, we replace `--branch` with `--auto-detect-version-properties`

```bash
publish_pacts:
  @"${PACT_CLI}" publish ${PWD}/pacts --consumer-app-version ${GIT_COMMIT} --auto-detect-version-properties
```

In the [src/product/product.pact.test.js](https://github.com/pactflow/example-provider-legacy/blob/master/src/product/product.pact.test.js) file in the provider project, we have configured the verification task to fetch the latest pacts that belong to the configured `mainBranch` for each consumer  (`{ mainBranch: true }`), and the pacts that belong to the currently deployed versions (`{ deployed: true }` - we'll explain how the broker knows which versions are deployed in the next section).

You can read more about how to configure the main branch property [here](https://docs.pact.io/pact_broker/branches#pacticipant-main-branch-property), but all you need to know for now, is this allows our provider to support 2 or more consumers, which each have a different named main branch (such as `master` or `main`).

```js

const fetchPactsDynamicallyOpts = {
  ...,
  provider: "pactflow-example-provider-legacy",
  consumerVersionSelectors: [{ mainBranch: true }, { deployed: true }],
  ...
}
```

When we publish the verifications, we similarly associate the provider version with the git branch.

```js
const baseOpts = {
  ...,
  providerVersion: process.env.GIT_COMMIT,
  providerVersionBranch: process.env.GIT_BRANCH,
  ...
}
```

## Recording deployments

To allow Pact to ensure your APIs are always backwards compatible with the consumer versions that are in production, the Pact Broker needs to know which application versions are actually in production. To do this, we use the [`record-deployment`](https://docs.pact.io/pact_broker/recording_deployments_and_releases/) command that comes with the Pact Broker CLI. You will see this in the Makefile of each project.

```bash

record_deployment:
    @"${PACT_CLI}" broker record-deployment --pacticipant ${PACTICIPANT} --version ${GIT_COMMIT} --environment production
```

Though our example is hardcoded to "production", this command should be run after a successful deployment to any environment for both consumers and providers. The "production" and "test" environments have been seeded for you in your Pactflow account, but if you want to add any more environments, you will need to add them yourself using the Pact Broker CLI or [UI](/docs/user-interface/settings/environments)

For mobile applications and code libraries that are "released" to an app store/repository rather than being "deployed", the "record-release" command should be used. It's not relevant for this workshop, but you can read more about it [here](https://docs.pact.io/pact_broker/recording_deployments_and_releases/) if/when you need to.

Recording the deployment allows us to use the consumer version selector `{ deployed: true }` in `src/product/product.pact.test.js`, to make sure we are verifying the pacts for all the currently deployed versions.

It also allows us to use the `can-i-deploy` command (more on this later) to make sure we're safe to deploy to an environment.
