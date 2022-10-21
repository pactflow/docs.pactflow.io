---
id: configure-webhook
title: Configure webhook
---

When using Pact in a CI/CD pipeline, there are two reasons for a pact verification task to take place:

* When the provider changes (to make sure it does not break any existing consumer expectations)
* When a pact changes (to see if the provider is compatible with the new expectations)

To ensure that the verification step is run whenever a pact changes, we need to configure a Pactflow webhook to trigger a provider verification build in Github Actions. You can see the configuration for this build in `.github/workflows/verify_changed_pact.yml` in the provider project. Rather than verifying the pacts with the configured tags, this build just verifies the pact that has changed. This is achieved by passing the URL of the changed pact to the build via a parameter in the body of the webhook request.

The Pactflow webhook will need a Github access token to be able to trigger the build in Github. We don't want the Github token to be stored in clear text in the webhook, so we will create a secret in Pactflow to contain token.

1. Create a Github token.
    1. In Github:
        1. Open the `Personal access tokens page`
            1. Click on your profile picture in the top right of the window.
            1. Select `Settings` -> Select `Developer settings` from the bottom of the menu on the left -> Select `Personal access tokens` from the menu on the left.
        1. Click `Generate new token`
        1. Set `Note` to `Token for triggering example-provider pact verification build`
        1. Select `public_repo` scope.
        1. Click `Generate token`
        1. Copy the value of the token and put it in an open file (or better yet, store it in your password manager!)

1. Create a Pactflow secret for the Github token.
    1. In your Pactflow account:
        1. Go to the Secrets page
            1. Click on the Settings icon in the top left (it looks like a cog wheel) -> Select the `Secrets` tab from the menu on the left.
        1. Click "ADD SECRET"
        1. Select "None" in the team drop down box.
        1. Enter the name `githubToken` and paste the value that you copied in the previous step.
        1. Click "CREATE"

1. Create the webhook.
    1. In your Pactflow account:
        1. Select the `Webhooks` tab from the settings page.
        1. Click "ADD WEBHOOK".
        1. Set:
            * Team: None
            * Description:

                ```
                Pact changed webhook for pactflow-example-provider
                ```

            * Consumer: leave as "ALL"
            * Provider: select `pactflow-example-provider`
            * Events: select `Contract published with changed content or tags`
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

                ```
                {
                  "event_type": "pact_changed",
                  "client_payload": {
                    "pact_url": "${pactbroker.pactUrl}"
                  }
                }
                ```

        1. Click the "TEST" button and ensure that it runs successfully.

                👉 The Github API returns a 404 instead of an authorization error if the token is not correctly set. If you see a 404, it may be that the URL is incorrect, or it may be that the access token is not configured correctly.

        1. Click the "CREATE" button.

1. Verify that the pact verification build for the provider is running correctly
    1. In Github:
        1. Open the Github Actions page for the "Verify changed pact" workflow
            1. Click `Actions` -> Under `Workflows`, select `Verify changed pact`
        1. Select the latest execution

👉 Each of the above steps can be automated in Pactflow via the Pactflow API - you can see the targets for the commands in the provider's Makefile.

## Expected state by the end of this step

* Both consumer and provider builds passing ✅
* A webhook that has been tested and shown to trigger a pact verification build of the provider.
