# 9. Deploy your consumer to Production

:::info
If you are running in github actions, we will do the publish and deploy step all in one here, as we are running our example from the master/main branch
:::

Now that we have tested our consumer and published our consumer contract, we can deploy the application to production.

Just like our provider counterpart, we're going to call `can-i-deploy` to check if it's safe before we do.

_REMEMBER: The `can-i-deploy` command is an important part of a CI/CD workflow, adding stage gates to prevent deploying incompatible applications to environments such as production_

This diagram shows an illustrative CI/CD pipeline as it relates to our progress to date:

![consumer pipeline run](../../../../static/workshops/bi-directional/consumer-pipeline.png)

## Deploying the consumer build to Production locally

Let's run the command:

`npm run can-i-deploy`

This should pass, because the provider has already pulbished its contract and deployed to production, and we believe the consumer is compatible with the provider OAS:

```
$ npx pact-broker can-i-deploy --pacticipant pactflow-example-consumer-mountebank --version $GIT_COMMIT --to-environment production
Computer says yes \o/

CONSUMER                             | C.VERSION | PROVIDER                        | P.VERSION | SUCCESS? | RESULT#
-------------------------------------|-----------|---------------------------------|-----------|----------|--------
pactflow-example-consumer-mountebank | 5009e94   | pactflow-example-bi-directional-provider-dredd | 6559541   | true     | 1

VERIFICATION RESULTS
--------------------
1. https://test.pactflow.io/hal-browser/browser.html#https://test.pactflow.io/contracts/provider/pactflow-example-bi-directional-provider-dredd/version/6559541/consumer/pactflow-example-consumer-mountebank/pact-version/ce2a9dfed28309e26288b9c9333529c92762d36a/verification-results (success)

All required verification results are published and successful
```

We can now deploy our consumer to production. Once we have deployed, we let Pactflow know that the new version of the consumer has been promoted to that environment:

`npm run deploy`

This allows Pactflow to prevent any providers from deploying an incompatible change to `production`.

# Check

Your dashboard should look something like this, where both your consumer and consumer are marked as having been deployed to `production`:

![pactflow dashboard - completed](../../../../static/workshops/bi-directional/pactflow-dashboard-complete.png)

## Deploying the consumer build in Github Actions to Production

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
