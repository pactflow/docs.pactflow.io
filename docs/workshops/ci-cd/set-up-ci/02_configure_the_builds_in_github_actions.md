---
id: configure-the-builds-in-github-actions
title: Test the builds in Github Actions
---

**In Github:**

1. Open your forked `example-consumer` project (`https://github.com/<your-username>/example-consumer`)
1. Click on the `Actions` tab.
1. Under the `Workflows` menu on the left, select `Build`.
1. You will see the text `This workflow has a workflow_dispatch event trigger`. To the right of that text is a button with the label `Run workflow`. Click the button.
1. Leave the branch as `master` and click the green `Run workflow` button.

❌ The build will fail with an authentication error when it tries to publish the pact - that's expected. We need to update the configuration to point it at your new Pactflow account.

🔁 Repeat the above instructions to configure the Pactflow account for your provider project.

## Expected state by the end of this step

* Both consumer and provider builds failing with authentication errors ❌
