# Setting up

## Prerequisites

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). You need to know how to git clone, pull, push and commit.
* [Make](https://www.gnu.org/software/make/manual/make.html) - it should be installed by default on Linux/Mac. If you have Windows, install it from [sourceforge](http://gnuwin32.sourceforge.net/packages/make.htm). Note - you won't need any previous experience in using make for this workshop.
* [Node](https://nodejs.org/) 12 or thereabouts.
* [Docker](https://www.docker.com/products/docker-desktop).
* A [Github](https://github.com/) account.
* A [Pactflow](https://pactflow.io) account - ideally, your own personal one. You can sign up for a free developer account [here](https://pactflow.io/pricing/). You can use a shared company Pactflow account, but it will make things a bit fiddly, as you'll need to change the identifiers of the various resources that get created so that they don't clash with those from other workshop participants. We've found from past experience running workshops that it's much simpler if everyone has their own account.

:::caution Note on the shell scripts
These instructions have been written for, and tested, in a *bash* (not zsh) shell on Mac. They should work correctly on Linux. If you are using Windows, then you will need to know how to run git/make/node CLI commands, or pair with someone who does.
:::

:::info
If you have access to a second screen, we recommend that you use it for this workshop, as there is a lot of window switching involved.
:::



## Provider GitHub Actions Build

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










## Consumer GitHub Actions Build


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
