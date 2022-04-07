# Setting up the Provider GitHub Actions Build

### Fork and clone the provider

1. Fork the [example-bi-directional-provider][example-bi-directional-provider] project in to your own Github account (click the 'Fork' button in the top right).
2. Clone the repositories on to your local machine.

    ```bash
    git clone git@github.com:<YOUR_GITHUB_USERNAME>/example-bi-directional-provider.git
    ```

3. Install the dependencies in each project.

    ```bash
    npm install
    ```

[example-bi-directional-provider]: https://github.com/pactflow/example-bi-directional-provider


### Test the provider build in Github Actions

**In Github:**

1. Open your forked `example-bi-directional-provider-<tool>` project (`https://github.com/<your-username>/example-bi-directional-provider-<tool>`)
1. Click on the `Actions` tab.
1. Click the button with the text "I understand my workflows, go ahead and enable them"
1. Under the `Workflows` menu on the left, select `Build`.
1. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
1. Leave the branch as `master` and click the green `Run workflow` button.

❌ The build will fail with an authentication error when it tries to publish the pact - that's expected. We need to update the configuration to point it at your new Pactflow account.


### Expected state by the end of this step

* The provider builds fails with authentication errors ❌

### Configure provider pipeline

1. Create a Github Secret to store your Pactflow API token in.
   1. In Pactflow:
      1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > API Tokens.
      1. Click the Copy button for the read/write CI token (make sure it's the read _write_ one, not the read only one).
   1. In Github:
      1. Open your forked `example-bi-directional-provider` project (`https://github.com/<your-username>/example-bi-directional-provider`)
      1. Click on the `Settings` tab.
      1. Select `Secrets` from the side menu.
      1. Click `New repository secret` (the button is to the right of the "Actions secrets" heading)
      1. Set the name of the secret to `PACTFLOW_TOKEN_FOR_CI_CD_WORKSHOP`
      1. Paste in the Pactflow API token value you copied in the previous step.
1. Configure the Pact Broker base URL.
   1. On your local machine:
      1. Open the `example-bi-directional-provider` project in your IDE.
      1. Open `.github/workflows/build.yml`
      1. Update the value of `PACT_BROKER_BASE_URL` to the base URL of your own Pactflow account. You can easily get this by clicking the `COPY PACTFLOW BASE URL` button on the API Tokens page in Pactflow.
      1. While you're in there, you can delete the `.github/workflows/trigger_partner_docs_update.yml` workflow. It's not used in the execution of workshop, and deleting it will remove some noise from the Github Actions page.
      1. Commit and push your changes.
1. View the build:
   1. In Github:
      1. Go to the `Actions` tab, and select the `Build` workflow.
      1. Select the most recent build.

This build should now successfully publish the provider contract and evidence, and it will pass on the `can-i-deploy` step before it tries to deploy. This is because the provider has no consumers, so is safe to deploy.

After you have pushed your changes to the workflow files, the provider pipeline will run, fetching and verifying the configured pacts from your Pactflow account, and publishing the results back. The `can-i-deploy` command will pass, and allow the provider to be deployed. ✅

### Expected state by the end of this step

- The provider build is passing and it is deployed to production ✅