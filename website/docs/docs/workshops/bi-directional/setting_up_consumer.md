# Setting up the Consumer GitHub Actions Build


### Fork and clone the consumer

1. Fork the [example-bi-directional-consumer][example-bi-directional-consumer-<tool>] project in to your own Github account (click the 'Fork' button in the top right).
2. Clone the repositories on to your local machine.

    ```bash
    git clone git@github.com:<YOUR_GITHUB_USERNAME>/example-bi-directional-consumer-<tool>.git
    ```

3. Install the dependencies in each project.

    ```bash
    npm install
    ```

[example-bi-directional-consumer]: https://github.com/pactflow/example-bi-directional-consumer-<tool>

### Test the consumer build in Github Actions

**In Github:**

1. Open your forked `example-bi-directional-consumer-<tool>` project (`https://github.com/<your-username>/example-bi-directional-consumer-<tool>`)
1. Click on the `Actions` tab.
1. Click the button with the text "I understand my workflows, go ahead and enable them"
1. Under the `Workflows` menu on the left, select `Build`.
1. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
1. Leave the branch as `master` and click the green `Run workflow` button.

❌ The build will fail with an authentication error when it tries to publish the pact - that's expected. We need to update the configuration to point it at your new Pactflow account.

### Expected state by the end of this step

* The consumer build fails with authentication errors ❌

### Configure consumer pipeline

The source repositories are configured to use the the public broker at test.pactflow.io. You will need to update the credentials to point to your own Pactflow account. To do this, we need to update the `PACT_BROKER_BASE_URL` environment variable in the Github workflow file, and create a Github Secret to store the Pactflow API token in.

1. Create a Github Secret to store your Pactflow API token in.
   1. In Pactflow:
      1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > API Tokens.
      1. Click the Copy button for the read/write CI token (make sure it's the read _write_ one, not the read only one).
   1. In Github:
      1. Open your forked `example-bi-directional-consumer-<tool>` project (`https://github.com/<your-username>/example-bi-directional-consumer-<tool>`)
      1. Click on the `Settings` tab.
      1. Select `Secrets` from the side menu.
      1. Click `New repository secret` (the button is to the right of the "Actions secrets" heading)
      1. Set the name of the secret to `PACTFLOW_TOKEN_FOR_CI_CD_WORKSHOP`
      1. Paste in the Pactflow API token value you copied in the previous step.
1. Configure the Pact Broker base URL.
   1. On your local machine:
      1. Open the `example-bi-directional-consumer-<tool>` project in your IDE.
      1. Open `.github/workflows/build.yml`
      1. Update the value of `PACT_BROKER_BASE_URL` to the base URL of your own Pactflow account. You can easily get this by clicking the `COPY PACTFLOW BASE URL` button on the API Tokens page in Pactflow.
      1. While you're in there, you can delete the `.github/workflows/trigger_partner_docs_update.yml` workflow. It's not used in the execution of workshop, and deleting it will remove some noise from the Github Actions page.
      1. Commit and push your changes.
1. View the build:
   1. In Github:
      1. Go to the `Actions` tab, and select the `Build` workflow.
      1. Select the most recent build.

This build should now successfully publish the pact, and it will pass on the `can-i-deploy` step before it tries to deploy. This is because the provider and consumer has been checked to ensure they are cross-compatible.


### Expected state by the end of this step

- The consumer build is passing and it is deployed to production ✅





### Setup deployment environment

:::info
This step should only be required if you have a legacy Pactflow account. New users should automatically have a production account created
:::

<details>
  <summary>Create a new production environment to record deployments against</summary>

  1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > Environments.
  2. Click Add Environment
  3. Enter `production` for the name and display name
  4. Check the "this is a production environment" checkbox
  5. Select the default team
  6. Click "Create"
     
</details>
