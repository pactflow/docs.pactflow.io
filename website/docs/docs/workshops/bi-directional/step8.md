# 8. Publish your consumer contract to Pactflow

Now that we have created our consumer contract, we need to share it to our provider. This is where Pactflow comes in to the picture. This step is referred to as "publishing" the consumer contract.

## Publish the consumer build locally

As per step 4, we're going to need credentials to our Pactflow account here:

1. Go to Pactflow and copy your [read/write API Token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
1. Export these two environment variables into the terminal, being careful to replace the placeholders with your own values:

   ```
   export PACT_BROKER_BASE_URL=https://YOUR_PACTFLOW_SUBDOMAIN.pactflow.io
   export PACT_BROKER_TOKEN=YOUR_API_TOKEN
   ```

1. `npm run publish`
1. Go to your Pactflow dashboard and check that a new contract has appeared

Your dashboard should look something like this:

![pactflow-dashboard-unverified](../../../../static/workshops/bi-directional/pactflow-dashboard-unverified.png)

### Expected state by the end of this step

- There should be a contract published in your Pactflow account before moving on

## Publish the consumer build in Github Actions

**In Github:**

1. Open your forked `example-bi-directional-consumer-<tool>` project (`https://github.com/<your-username>/example-bi-directional-consumer-<tool>`)
1. Click on the `Actions` tab.
1. Click the button with the text "I understand my workflows, go ahead and enable them"
1. Under the `Workflows` menu on the left, select `Build`.
1. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
1. Leave the branch as `master` and click the green `Run workflow` button.

❌ The build will fail with an authentication error when it tries to publish the pact - that's expected. We need to update the configuration to point it at your new Pactflow account.

### Expected state by the end of this step

- The consumer build fails with authentication errors, don't worry, we will address this in the next step ❌
