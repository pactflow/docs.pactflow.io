# 4. Publish the provider contract to PactFlow

Now that we have created and verified our provider contract, we need to share the contract to our consumers. This is where PactFlow comes in to the picture. This step is referred to as "publishing" the provider contract.

The publishing step takes two key components:

- The provider contract itself (in our case, the OAS document)
- The test results (in our case, the Dredd output and whether or not it passed)

This information will be helpful later on, when we need to check compatibility with its consumers.

## Publish the provider contract locally

1. Go to PactFlow and copy your [read/write API Token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
1. Export these two environment variables into the terminal, being careful to replace the placeholders with your own values:

   ```
   export PACT_BROKER_BASE_URL=https://YOUR_PACTFLOW_SUBDOMAIN.pactflow.io
   export PACT_BROKER_TOKEN=YOUR_API_TOKEN
   ```

1. `npm run publish`
1. Go to your PactFlow dashboard and check that a new contract has appeared

Your dashboard should look something like this:

![pactflow-dashboard-unverified](../../../../static/workshops/bi-directional/dashboard-provider-only.png)

## Publish the provider contract in Github Actions

### Setup your Pipeline

**In Github:**

1. Open your forked `example-bi-directional-provider-<tool>` project (`https://github.com/<your-username>/example-bi-directional-provider-<tool>`)
1. Click on the `Actions` tab.
1. Click the button with the text "I understand my workflows, go ahead and enable them"
1. Under the `Workflows` menu on the left, select `Build`.
1. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
1. Leave the branch as `master` and click the green `Run workflow` button.

❌ The build will fail with an authentication error when it tries to publish the pact - that's expected. We need to update the configuration to point it at your new PactFlow account.

#### Expected state by the end of this step

- The provider builds fails with authentication errors, don't worry, we will address this in the next step ❌
