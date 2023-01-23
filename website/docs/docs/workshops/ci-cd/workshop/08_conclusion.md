---
id: conclusion
title: Conclusion
---

We have demonstrated how the CI/CD pipelines of the consumer and provider work with Pact and PactFlow, and how to introduce and release new features using consumer driven contracts, while keeping each project deployable throughout the process.

Principles to remember:

* Associate application versions with the name of the git branch as per the [Branches](https://docs.pact.io/pact_broker/branches) documentation
* [Record the deployment](https://docs.pact.io/pact_broker/recording_deployments_and_releases/) in PactFlow after a successful deployment.
* [Configure the provider](https://docs.pact.io/provider/recommended_configuration#verification-triggered-by-provider-change) to verify the latest pact for the main branch of development, and the currently deployed (or released) versions.
* Enable ["pending pacts"](https://docs.pact.io/pending) in the provider to ensure that changed pacts don't break provider builds unncessarily.
* Enable ["work in progress pacts"](https://docs.pact.io/wip) in the provider to automatically verify any pending "feature pacts" during CI verification (allows verification results for feature pacts to be published from CI without having to manually update the provider configuration for each feature pact).
* Make changes to pacts on feature branches for the consumer, and merge once the feature pact has been successfully verified.
