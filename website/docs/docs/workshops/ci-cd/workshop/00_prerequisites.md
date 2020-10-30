---
id: prerequisites
title: Prerequisites
---

* CI/CD pipelines for the consumer and provider as per the [Setup CI/CD page](https://raw.githubusercontent.com/pactflow/docs.pactflow.io/master/docs/ci-cd-workshop/set-up-ci)
* A working local development set up as per the [Setup local development](https://raw.githubusercontent.com/pactflow/docs.pactflow.io/master/docs/ci-cd-workshop/set-up-local-development) page.
* Both consumer and provider builds in Travis CI should both be passing on master.
* If you have access to a second screen, we recommend that you use it for this workshop, as there is a lot of window switching involved.
* Suggested window configuration:
    * In [Travis CI][travis-ci]:
        * One tab for the example-consumer build
        * One tab for the example-provider build
    * In Pactflow
        * A tab for the example pact dashboard
    * In your editor of choice:
        * One window for the example-consumer
        * One window for the example-provider
    * In your terminal of choice:
        * One shell for the example-consumer
        * One shell for the example-provider
    * Close everything else that you can! It can get confusing switching backwards and forwards between all the windows in the workshop.
* Have a look at the configuration in the consumer and provider projects that deals with the *tags*. Read more below.

## Tag configuration

Tags are used to wire up the consumer project to the provider project and make sure we are verifying the right pacts.

In the [Makefile](https://github.com/pactflow/example-consumer/blob/master/Makefile) file in the consumer project, we tag the consumer version with the name of the branch.

```sh
@"${PACT_CLI}" publish ${PWD}/pacts --consumer-app-version ${TRAVIS_COMMIT} --tag ${TRAVIS_BRANCH}
```

In the [src/products/product.pact.test.js](https://github.com/pactflow/example-provider/blob/master/src/product/product.pact.test.js) file in the provider project, we have configured the verification task to fetch the pacts that belong to the latest consumer versions with `master` and `prod` tags.

```js

const baseOpts = {
  ...,
  providerVersionTag: process.env.TRAVIS_BRANCH
}

const fetchPactsDynamicallyOpts = {
  ...,
  provider: "pactflow-example-provider",
  consumerVersionSelectors: [{ tag: 'master', latest: true }, { tag: 'prod', latest: true } ],
}
```

[travis-ci]: https://travis-ci.com

<!-- This file has been synced from the pactflow/docs.pactflow.io repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

