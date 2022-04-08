# Get started in 10 steps

:::note
You can get started via your phone or tablet, but it's easier at a computer!
:::

## Get a GitHub account

:::info
All our examples run on Github Actions CI pipelines. You'll need an account. Don't worry its free
:::

- [ ] Don't have one - sign up 👉 [here](https://github.com/signup)
- [x] I've already got one!

:::success
You are logged in to your GitHub account
:::

## Get a Pactflow account

:::info
The Bi-Directional Feature is only supported by Pactflow, so you'll need an account, Don't worry, the developer tier is free.
:::

- [ ] Don't have one - sign up 👉 [here](https://pactflow.io/try-for-free) 
- [ ] I've got a company account (see below)
- [X] I've already got one!


<details>
  <summary>Using a shared company Pactflow account?</summary>

:::info
You can use a shared company Pactflow account, but it will make things a bit fiddly, as you'll need to change the identifiers of the various resources that get created so that they don't clash with those from other workshop participants. We've found from past experience running workshops that it's much simpler if everyone has their own account.
:::

</details>

:::success
You have got your Pactflow account, and are successfully logged in.
:::

:::warning
Not got an email? Don't forget to check your spam folder!
:::

## Pick a provider

## Fork the repo

1. Fork the [example-bi-directional-provider-dredd](https://github.com/pactflow/example-bi-directional-provider-dredd) project in to your own Github account (click the 'Fork' button in the top right).

:::success
In the GitHub address bar you can see `https://github.com/<your_github_id>/example-bi-directional-provider-<your_chosen_provider>` ✅
:::

## Create a Github Secret to store your Pactflow API token in.

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

:::success
You've successfully updated your PACTFLOW_TOKEN_FOR_CI_CD_WORKSHOP to your read/write CI token from Pactflow  ✅
:::
   
## Create a Github Secret to store your Pactflow Base url in.

:::info
💡 We don't need to store this as a secret, but it's the quickest way to get you started. You can also press `.` when viewing any public GitHub repo, and open a live code editor, or swap the your repo from `.com` to `.dev`. Try it [out](https://github.com/github/dev) 
:::

   1. In Pactflow:
      1. Go to Settings > API Tokens.
      1. Click the `COPY PACTFLOW BASE URL` button
   1. In Github:
      1. Open your forked `example-bi-directional-provider` project (`https://github.com/<your-username>/example-bi-directional-provider`)
         1. Open `.github/workflows/build.yml`
         2. Click on the `Settings` tab.
         3. Select `Secrets` from the side menu.
         4. Click `New repository secret` (the button is to the right of the "Actions secrets" heading)
         5. Set the name of the secret to `PACT_BROKER_BASE_URL`
         6. Paste in the Pactflow Base Url value you copied in the previous step.

:::success
You've successfully updated your PACT_BROKER_BASE_URL to be the same as shown in your web browser address bar, when you view your Pactflow account ✅
:::

## Run the build workflow

**In Github:**

   1. In Github:
      1. Open your forked `example-bi-directional-provider-<tool>` project (`https://github.com/<your-username>/example-bi-directional-provider-<tool>`)
      2. Click on the `Actions` tab.
      3. Click the button with the text "I understand my workflows, go ahead and enable them"
      4. Under the `Workflows` menu on the left, select `Build`.
      5. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
      6. Leave the branch as `master` and click the green `Run workflow` button.

:::success
This build should now successfully publish the provider contract and evidence, and it will pass on the `can-i-deploy` step before it tries to deploy. This is because the provider has no consumers, so is safe to deploy.

After you have pushed your changes to the workflow files, the provider pipeline will run, fetching and verifying the configured pacts from your Pactflow account, and publishing the results back. The `can-i-deploy` command will pass, and allow the provider to be deployed. ✅
:::

## Run steps again for your consumer

1. Fork the repo - [click here to see the instructions again](#fork-the-repo) 
2. Create a Github Secret to store your Pactflow API token in. - [click here to see the instructions again](#create-a-github-secret-to-store-your-pactflow-api-token-in) 
3. Create a Github Secret to store your Pactflow Base url in. - [click here to see the instructions again](#create-a-github-secret-to-store-your-pactflow-base-url-in) 
4. Run the build workflow - [click here to see the instructions again](#run-the-build-workflow) 




## See a breaking change on either the consumer or the provider

   1. In Github:
      1. Open your forked `example-bi-directional-<consumer|provider>-<tool>` project (`https://github.com/<your-username>/example-bi-directional-provider-<tool>`)
      2. Click on the `Actions` tab.
      3. Click the button with the text "I understand my workflows, go ahead and enable them"
      4. Under the `Workflows` menu on the left, select `Build`.
      5. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
      6. Change the branch to `add_breaking_change` and click the green `Run workflow` button.

:::warning
This build should now fail
:::
