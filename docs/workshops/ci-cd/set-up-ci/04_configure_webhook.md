---
id: configure-webhook
title: Configure webhook
---

To ensure that the verification step is run whenever a pact changes, we need to configure a webhook to trigger a provider verification build in Github Actions. The webhook will need an authentication token to be able to make this call to the Github API. We don't want the Github token to be stored in clear text in the webhook, so we will create a secret in Pactflow to contain token.

1. Create a Github token
    1. In Github:
        1. Open the `Personal acesss tokens page`
            1. Click on your profile picture in the top right of the window.
            1. Select `Settings` -> Select `Developer settings` from the bottom of the menu on the left -> Select `Personal access tokens` from the menu on the left.
        1. Click `Generate new token`
        1. Set `Note` to `Token for triggering example-provider pact verification build`
        1. Select `public_repo` scope.
        1. Click `Generate token`
        1. Copy the value of the token and put it in an open file (or better yet, store it in your password manager!)

1. Create a Pactflow secret for the Travis token.
    1. In your Pactflow account:
        1. Go to the Secrets page
            1. Click on the Settings icon in the top left (it looks like a cog wheel) -> Select the `Secrets` tab from the menu on the left.
        1. Click "ADD SECRET"
        1. Enter the name `githubToken` and paste the value that you copied in the previous step.
        1. Click "CREATE"

1. Create the webhook.
    1. In your Pactflow account:
        1. Select the `Webhooks` tab from the settings page.
        1. Click "ADD WEBHOOK".
        1. Set:
            * Description:

                ```
                Pact changed webhook for pactflow-example-provider
                ```
            * Consumer: leave as "ALL"
            * Provider: select `pactflow-example-provider`
            * Events: select `Contract published with changed content or tags`
            * URL:

                ```
                https://api.github.com/repos/<YOUR GITHUB ACCOUNT HERE>/example-provider/dispatches
                ```

                ```
                Content-Type: application/json
                Accept: Accept: application/vnd.github.everest-preview+json
                Authorization: Bearer ${user.githubToken}
                ```
            * Body:

                ```
                {
                  "event_type": "pact_changed",
                  "client_payload":
                    {
                      "pact_url": "${pactbroker.pactUrl}"
                    }
                  }
                }
                ```
          1. Click the "TEST" button and ensure that it runs successfully.
          1. Click the "CREATE" button.

1. Verify that the pact verification build for the provider is running correctly
    1. In Github:
        1. Open the Github Actions page for the "Verify changed pact" workflow
            1. Click `Actions` -> Under `Workflows`, select `Verify changed pact`
        1. Select the latest execution

👉 Each of the above steps can be automated in Pactflow - you can see the targets for them in the provider's Makefile.

## Expected state by the end of this step

Both consumer and provider builds passing, and a webhook that has been tested and shown to trigger a pact verification build of the provider.
