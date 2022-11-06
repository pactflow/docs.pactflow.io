---
id: implementing-the-provider-changes
title: Implementing the provider changes
---

The next step is to implement the changes that have been requested in the pact.

1. Open up the terminal for your provider project.

1. Run `make test` to make sure everything is passing before you start.
   1. Your test run should exit successfully, but show the failing verification from our consumers feature branch. If we didn't have `enablePending` set, this would exit with a failure.
    * 👉 This will run our unit tests and our Pact test which "fetch pacts for these consumer version selectors" mode. This is executed as part of the following GitHub workflow `.github/workflows/build.yml`
  
2. Get the URL of the new pact:
    * Go to your Pactflow account, find the new pact on the consumer branch `feat/new-field` and click "VIEW PACT".
    * In the top right, click the 3 dots and select `Copy pact URL for pactflow-example-consumer version xyz`.

3. Run `PACT_URL=<PACT URL HERE> make test_webhook`. This test should correctly fail with the error `Could not find key "color"` in the output.
    * 👉 We run a new command here `make test_webhook`. This allows us to "verify a custom pact", it works because of the code in in `src/product/product.consumerChange.pact.test.js`
    * Rather than our `product.providerChange.pact.test.js` test which "fetch pacts for these consumer version selectors" mode, by running `make test` who workflow in GitHub is in this file `.github/workflows/build.yml`
    * When running `make test_webhook`, The `$PACT_URL` is passed in when the build is triggered by a "contract requiring verification published" webhook, and allows us to verify just the changed pact against the providers main branch and any deployed (or released) versions. The workflow in GitHub is in this file `.github/workflows/contract_requiring_verification_published.yml`
    * We share the base Pact setup in `src/product/pact.setup.js` for both types of Pact verification, so both can re-use `Provider States` / `Request filters` and core setup common to both tasks.

4. Make the test pass by adding a `color` field to `product/product.js`, and adding the new color argument to the Product initialization lines in `product/product.repository.js` and the provider states in `product/product.pact.test.js`.

    ```js
    constructor(id, type, name, version, color) {
      this.id = id;
      this.type = type;
      this.name = name;
      this.version = version;
      this.color = color;
    }
    ```

    ```js
    constructor() {
        this.products = new Map([
            ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1", "green")],
            ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1", "blue")],
            ["11", new Product("11", "PERSONAL_LOAN", "MyFlexiPay", "v2", "yellow")],
        ]);
    }
    ```

    ```js
    const stateHandlers = {
      "products exists": () => {
        controller.repository.products = new Map([
          ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1","blue")],
        ]);
      },
      "products exist": () => {
        controller.repository.products = new Map([
          ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1","blue")],
        ]);
      },
      "a product with ID 10 exists": () => {
        controller.repository.products = new Map([
          ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1","blue")],
        ]);
      },
      "a product with ID 11 does not exist": () => {
        controller.repository.products = new Map();
      },
    };
    ```

5. Run `PACT_URL=<PACT URL HERE> make test_webhook` and you should have a passing test suite. ✅

   1. `git add . && git commit -m 'feat: add color' && git push`
6. We won't commit our changes until the next step.

## Expected state by the end of this step

* A passing provider build in Github Actions.
* Local changes on your provider codebase that implements the features required by the `feat/new-field` pact on its `master` branch.
* A `feat/new-field` pact with a failed verification result

## Conclusion

The `master` provider is now compatible with the `feat/new-field` pact, based on your local changes. However, there is still a failing verification result published for the `feat/new-field` pact, triggered by a webhook (contract requiring verification published) when the new pact was published.

We verified the Pact would pass against our providers main branch `master` by passing in the Pact URL directly, however because it was only verified on a development machine, and we don't typically publish verification results from dev machines.

The next step is getting a result back to Pactflow so that the consumer knows they are safe to merge.
