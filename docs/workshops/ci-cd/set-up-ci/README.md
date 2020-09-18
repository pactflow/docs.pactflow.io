---
id: index
title: Goals
---

By the end of this step, you will have a CI/CD pipeline for a consumer and provider project. It will run the builds using Github Actions, and use Pactflow to exchange pacts and verification results, to trigger webhooks when pacts change, and to make sure each project is safe to deploy.

## Method

You will be using the Pactflow [example-consumer][example-consumer] and [example-provider][example-provider] projects as starting points for the workshop. You will be forking the repositories into your own Github account, setting up Github Actions as CI builds, and configuring the projects to point to your own Pactflow account.

[example-consumer]: https://github.com/pactflow/example-consumer
[example-provider]: https://github.com/pactflow/example-provider
