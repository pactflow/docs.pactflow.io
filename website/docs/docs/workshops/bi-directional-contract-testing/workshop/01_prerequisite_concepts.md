---
id: prerequisite-concepts
title: Prerequisite concepts
---

Before we start, let's do a brief overview of a couple of key Pact/Pact Broker concepts that you'll need to understand to get the most out of the workshop.

## Tags

Tags are simple String values that that belong to "pacticipant" version (that is, application version) resources in the Pact Broker. They are used to provide metadata about a version - the most common use case being to indicate the git branch of a version (eg. `master`).

Tags are used to make sure we are verifying the right pacts.

In the [Makefile](https://github.com/pactflow/example-consumer/blob/master/Makefile) file in the consumer project, we tag the consumer version with the name of the branch when we publish the pacts.

```bash
publish_pacts:
  @"${PACT_CLI}" publish ${PWD}/pacts --consumer-app-version ${GIT_COMMIT} --tag ${GIT_BRANCH}
```

In the [src/product/product.pact.test.js](https://github.com/pactflow/example-provider/blob/master/src/product/product.pact.test.js) file in the provider project, we have configured the verification task to fetch the pacts that belong to the latest consumer versions with the `master` tag (`{ tag: 'master', latest: true }`), and the pacts that belong to the currently deployed versions (`{ deployed: true }` - we'll explain how the broker knows which versions are deployed in the next section).

```js

const fetchPactsDynamicallyOpts = {
  ...,
  provider: "pactflow-example-provider",
  consumerVersionSelectors: [{ tag: 'master', latest: true }, { deployed: true }],
  ...
}
```

When we publish the verifications, we similarly tag the provider version with the git branch.

```js
const baseOpts = {
  ...,
  providerVersion: process.env.GIT_COMMIT,
  providerVersionTags: [process.env.GIT_BRANCH],
  ...
}
```

## Recording deployments

To allow Pact to ensure your APIs are always backwards compatible with the consumer versions that are in production, the Pact Broker needs to know which application versions are actually in production. To do this, we use the [`record-deployment`](https://docs.pact.io/pact_broker/recording_deployments_and_releases/) command that comes with the Pact Broker CLI. You will see this in the Makefile of each project.

```bash

record_deployment:
    @"${PACT_CLI}" broker record-deployment --pacticipant ${PACTICIPANT} --version ${GIT_COMMIT} --environment production
```

Though our example is hardcoded to "production", this command should be run after a successful deployment to any environment for both consumers and providers. The "production" and "test" environments have been seeded for you in your Pactflow account, but if you want to add any more environments, you will need to add them yourself using the Pact Broker CLI.

For mobile applications and code libraries that are "released" to an app store/repository rather than being "deployed", the "record-release" command should be used. It's not relevant for this workshop, but you can read more about it [here](https://docs.pact.io/pact_broker/recording_deployments_and_releases/) if/when you need to.

Recording the deployment allows us to use the consumer version selector `{ deployed: true }` in `src/product/product.pact.test.js`, to make sure we are verifying the pacts for all the currently deployed versions.

It also allows us to use the `can-i-deploy` command (more on this later) to make sure we're safe to deploy to an environment.

:::info

As of July 2021, recording deployments using the `record-deployment` command has just been released, and support for the corresponding selector `{ deployed: true }` has not yet been added to all the Pact client libraries. The previous method of recording releases was to use [tags](https://docs.pact.io/pact_broker/tags). If you are not using one of the libraries that currently supports the `{ deployed: true}` selector (currently Javscript and Ruby support it), you will need to use tags in the meantime as per the documentation in the Tags page.

:::  
