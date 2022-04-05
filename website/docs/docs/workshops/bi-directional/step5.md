# Deploy the provider

Now that we have tested our provider and published our provider contract, we can deploy the application to production.

Whilst we don't currently have any consumers to worry about, we want to be prepared for when we do. Pactflow has a tool called [`can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) to help us.

The `can-i-deploy` command is an important part of a CI/CD workflow, adding stage gates to prevent deploying incompatible applications to environments such as production.

This diagram shows an illustrative CI/CD pipeline as it relates to our progress to date:

![first provider pipeline run](./assets/provider-pipeline.png)

Let's run the command:

`npm run can-i-deploy`{{execute}}

This should pass, because as we discussed above, there are no consumers:

```
$ npm run can-i-deploy

> product-service@1.0.0 can-i-deploy /root/example-bi-directional-provider-dredd
> pact-broker can-i-deploy --pacticipant pactflow-example-bi-directional-provider-dredd --version="$(npx @pact-foundation/absolute-version)" --to-environment production

npx: installed 47 in 2.835s
Computer says yes \o/

There are no missing dependencies
```

Later on, when consumers start to use our API, we will be prevented from releasing a change that results in a backwards incompatible change for our consumers. Consumers will also use this command to ensure they are compatible with the Provider API in the target environment (in this case, `production`).

We can now deploy our provider to production. Once we have deployed, we let Pactflow know that the new version of the Provider has been promoted to that environment:

`npm run deploy`{{execute}}

This allows Pactflow to communicate to any future consumers of the provider, that the OAS associated with this version of the provider is supported in production. If a consumer adds functionality that uses a subset of the OAS, they will be free to deploy safely!

# Check

Your dashboard should now be updated, noting the provider has now been deployed to `production`.