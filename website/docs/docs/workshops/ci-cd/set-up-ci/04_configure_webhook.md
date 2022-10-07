---
id: configure-webhook
title: Configure webhook
---

When using Pact in a CI/CD pipeline, there are two reasons for a pact verification task to take place:

* When the provider changes (to make sure it does not break any existing consumer expectations)
* When a pact changes (to see if the provider is compatible with the new expectations)

To ensure that the verification step is run whenever a pact changes, we need to configure a Pactflow webhook to trigger a provider verification build in Github Actions.

You can see the configuration for this build in `.github/workflows/contract_requiring_verification_published.yml` in the provider project.

Rather than verifying the pacts with the configured [consumer version selectors](https://docs.pact.io/pact_broker/advanced_topics/consumer_version_selectors), it triggers once for each of the following provider versions that are missing a verification result for the newly published pact:

* the latest version from the provider's main branch
* any version currently deployed to an environment
  
This is achieved by passing the URL of the changed pact to the build via a parameter in the body of the webhook request, as well as the provider version number and the provider branch of the head, test and production versions.

See [here](https://docs.pact.io/pact_broker/webhooks#using-webhooks-with-the-contract_requiring_verification_published-event) for in-depth details about the "contract requiring verification published" event.

The Pactflow webhook will need a Github access token to be able to trigger the build in Github. We don't want the Github token to be stored in clear text in the webhook, so we will create a secret in Pactflow to contain token.

1. Create a Github token.
    1. In Github:
        1. Open the `Personal access tokens page`
            1. Click on your profile picture in the top right of the window.
            2. Select `Settings` -> Select `Developer settings` from the bottom of the menu on the left -> Select `Personal access tokens` from the menu on the left.
        2. Click `Generate new token`
        3. Set `Note` to `Token for triggering example-provider pact verification build`
        4. Select `public_repo` scope.
        5. Select an `Expiration` period for your token
        6. Click `Generate token`
        7. Copy the value of the token and put it in an open file (or better yet, store it in your password manager!)

2. Create a Pactflow secret for the Github token.
    1. In your Pactflow account:
        1. Go to the Secrets page
            1. Click on the Settings icon in the top left (it looks like a cog wheel) -> Select the `Secrets` tab from the menu on the left.
        2. Click "ADD SECRET"
        3. Select "None" in the team drop down box.
        4. Enter the name `githubToken` and paste the value that you copied in the previous step.
        5. Click "CREATE"

3. Create the "contract requiring verification published" webhook.
    1. In your Pactflow account:
        1. Select the `Webhooks` tab from the settings page.
        2. Click "ADD WEBHOOK".
        3. Set:
            * Team: None
            * Description: `Contract requiring verification published webhook for pactflow-example-provider`
            * Consumer: leave as "ALL"
            * Provider: select `pactflow-example-provider`
            * Events: select `Contract published that requires verification`
            * URL:

                ```bash
                https://api.github.com/repos/<YOUR GITHUB ACCOUNT HERE>/example-provider/dispatches
                ```

            * Headers:

                ```bash
                Content-Type: application/json
                Accept: Accept: application/vnd.github.everest-preview+json
                Authorization: Bearer ${user.githubToken}
                ```

            * Body:

                ```json
                {
                    "event_type": "contract_requiring_verification_published",
                    "client_payload": {
                        "pact_url": "${pactbroker.pactUrl}",
                        "sha": "${pactbroker.providerVersionNumber}",
                        "branch": "${pactbroker.providerVersionBranch}",
                        "message": "Verify changed pact for ${pactbroker.consumerName} version ${pactbroker.consumerVersionNumber} branch ${pactbroker.consumerVersionBranch} by ${pactbroker.providerVersionNumber} (${pactbroker.providerVersionDescriptions})"
                        }
                }
                ```

        4. Click the "TEST" button and ensure that it runs successfully.

                👉 The Github API returns a 404 instead of an authorization error if the token is not correctly set. If you see a 404, it may be that the URL is incorrect, or it may be that the access token is not configured correctly.

        5. Click the "CREATE" button.

4. Verify that the contract_requiring_verification_published verification build for the provider is running correctly
    1. In Github:
        1. Open the Github Actions page for the "contract_requiring_verification_published" workflow
            1. Click `Actions` -> Under `Workflows`, select `contract_requiring_verification_published`
        2. Select the latest execution
           1. This was triggered by pressing the `TEST` button in our webhook. In our CI/CD workflow, this will be triggered when a real `Contract published that requires verification` event takes place

👉 Each of the above steps can be automated in Pactflow via the Pactflow API - you can see the targets for the commands in the provider's Makefile.

## Expected state by the end of this step

* Both consumer and provider builds passing ✅
* A webhook that has been tested and shown to trigger a pact verification build of the provider.
