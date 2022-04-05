# Publish consumer contract to Pactflow

Now that we have created our consumer contract, we need to share it to our provider. This is where Pactflow comes in to the picture. This step is referred to as "publishing" the consumer contract.

As per step 4, we're going to need credentials to our Pactflow account here:

1. Go to Pactflow and copy your [read/write API Token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)
1. Export these two environment variables into the terminal, being careful to replace the placeholders with your own values:

   ```
   export PACT_BROKER_BASE_URL=https://YOUR_PACTFLOW_SUBDOMAIN.pactflow.io
   export PACT_BROKER_TOKEN=YOUR_API_TOKEN
   ```

1. `npm run publish`{{execute}}
1. Go to your Pactflow dashboard and check that a new contract has appeared

Your dashboard should look something like this:

![pactflow-dashboard-unverified](./assets/pactflow-dashboard-unverified.png)

## Don't have a Pactflow account?

If you don't have a Pactflow account, you can publish a [test broker](https://test.pactflow.io).

```
export PACT_BROKER_BASE_URL=https://test.pactflow.io
export PACT_BROKER_TOKEN=129cCdfCWhMzcC9pFwb4bw
```{{execute}}

If you use this account, note that you won't have access to the UI.

## Check

There should be a contract published in your Pactflow account before moving on.