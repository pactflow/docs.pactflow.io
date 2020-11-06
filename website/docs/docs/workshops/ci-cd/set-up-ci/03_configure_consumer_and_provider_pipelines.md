---
id: configure-consumer-and-provider-pipelines
title: Configure consumer and provider pipelines
---

## Configure consumer pipeline

The source repositories are configured to use the Pactflow Github and Travis accounts, and the public broker at test.pactflow.io. You will need to update these settings to point to your own accounts.

1. We need store the credentials in Travis CI to be able to publish to Pactflow:
    1. Log in to your Pactflow account (`https://<your-subdomain>.pactflow.io`), and go to Settings > API Tokens.
    1. Click the Copy button for the read/write CI token.
    1. Go to the project settings page(`https://travis-ci.com/github/<your org>/<your project>/settings`) and choose > "More options" > "Settings" > Environment Variables" and set the `PACT_BROKER_TOKEN` environment variable with the value of your read/write token.
1. In `.travis.yml` of the example-consumer project, set `PACT_BROKER_BASE_URL` to the base URL of your own Pactflow account (you will have received an email with this information). Commit and push this change.
1. Open the example-consumer project in Travis CI. This build should now successfully publish the pact, but it will fail on the `can-i-deploy` step when it tries to deploy. This is because the provider has not published a successful verification result for the pact.

After completing the above, your settings page should look something like this (note the "Environment Variables"):

![Travis Settings](/workshops/travis-settings.png)

## Configure provider pipeline

🔁 Repeat the above instructions to configure the Pactflow account for your provider project.

After you have pushed your changes to `.travis.yml`, the provider pipeline will run, fetching and verifying the configured pacts from your Pactflow account, and publishing the results back. The `can-i-deploy` command will pass, and allow the provider to be deployed.

## Back to the consumer

✅ If you would like to see all your builds go green, you can re-trigger the consumer build by selecting "More options" > "Trigger build" > "Trigger custom build".

## Expected state by the end of this step

Both consumer and provider builds passing.

<!-- This file has been synced from the pactflow/docs.pactflow.io repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

