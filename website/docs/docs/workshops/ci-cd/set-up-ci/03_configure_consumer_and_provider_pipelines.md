---
id: configure-consumer-and-provider-pipelines
title: Configure consumer and provider pipelines
---

## Setup deployment environment

1. Create a new production environment to record deployments against
   1. In Pactflow:
      1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > Environments.
      1. Click Add Environment
      1. Enter `production` for the name and display name
      1. Check the "this is a production environment" checkbox
      1. Select the default team
      1. Click "Create"

## Configure consumer pipeline

The source repositories are configured to use the the public broker at test.pactflow.io. You will need to update the credentials to point to your own Pactflow account. To do this, we need to update the `PACT_BROKER_BASE_URL` environment variable in the Github workflow file, and create a Github Secret to store the Pactflow API token in.

1. Create a Github Secret to store your Pactflow API token in.
   1. In Pactflow:
      1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > API Tokens.
      1. Click the Copy button for the read/write CI token (make sure it's the read _write_ one, not the read only one).
   1. In Github:
      1. Open your forked `example-consumer` project (`https://github.com/<your-username>/example-consumer`)
      1. Click on the `Settings` tab.
      1. Select `Secrets` from the side menu.
      1. Click `New repository secret` (the button is to the right of the "Actions secrets" heading)
      1. Set the name of the secret to `PACTFLOW_TOKEN_FOR_CI_CD_WORKSHOP`
      1. Paste in the Pactflow API token value you copied in the previous step.
1. Configure the Pact Broker base URL.
   1. On your local machine:
      1. Open the `example-consumer` project in your IDE.
      1. Open `.github/workflows/build.yml`
      1. Update the value of `PACT_BROKER_BASE_URL` to the base URL of your own Pactflow account. You can easily get this by clicking the `COPY PACTFLOW BASE URL` button on the API Tokens page in Pactflow.
      1. While you're in there, you can delete the `.github/workflows/trigger_partner_docs_update.yml` workflow. It's not used in the execution of workshop, and deleting it will remove some noise from the Github Actions page.
      1. Commit and push your changes.
1. View the build:
   1. In Github:
      1. Go to the `Actions` tab, and select the `Build` workflow.
      1. Select the most recent build.

This build should now successfully publish the pact, but it will fail on the `can-i-deploy` step before it tries to deploy. This is because the provider has not published a successful verification result for the pact.

## Configure provider pipeline

🔁 Repeat the above instructions to configure the Pactflow account for your provider project.

⚠️ There are _TWO_ workflow files to be updated in the provider project - `.github/workflows/build.yml` and `.github/workflows/verify_changed_pact.yml`.

After you have pushed your changes to the workflow files, the provider pipeline will run, fetching and verifying the configured pacts from your Pactflow account, and publishing the results back. The `can-i-deploy` command will pass, and allow the provider to be deployed. ✅

## Back to the consumer

✅ To make both your builds go green, trigger the `example-consumer` workflow again in the Github Actions page (`Actions` -> Under `Workflows`, select `Build` -> `Run workflow` -> `Run workflow`).

## Expected state by the end of this step

- Both consumer and provider builds passing ✅
