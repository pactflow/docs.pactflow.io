# 3. Write tests for your Provider

Now that we have our working Provider, we need to do two things to prevent introducing breaking changes to our consumers.

1. Ensure the API doesn't drift from it's OpenAPI description document (OAS)
2. Ensure the OAS doesn't change such that it could break any of its consumers

Right now, we don't have any consumers, but we want to be prepared for when we do.

For (1), we need to decide on our testing approach.
For (2), we'll use PactFlow's contract comparison capability to prevent breaking changes, which we cover in Step 5.

### Verifying the provider contract

There are severals ways we can test the Provider, to ensure it doesn't drift from the OAS. This process is referred to as _verifying the provider contract_.

1. Generate the OAS from code. This is the most reliable, because whenever the implementation changes, the OAS will change with it. Tools like Spring Docs (Java) and Swashbuckle (.NET) will do this for you.
1. White-box style tests that run as part of your unit tests. Tools such as RestAssured (Java) or Supertest (NodeJS) are examples.
1. Black-box style functional API testing, using tools like Dredd or Postman.

In our case, (1) is not acceptable as we've chosen to following design first approach. We decided to use (3), using a tool called Dredd. Dredd will read in our OAS, and issue HTTP calls to our locally running provider to ensure it's compatible with the spec.

#### Run the Provider tests

When using a black-box style tool, the testing involves the following steps:

1. Starting the API locally, stubbing out downstream dependencies where possible
1. Preparing data so that all of the OAS scenarios may be tested
1. Configuring the tool to read in the OAS and discover the provider
1. Running the tool
1. Capturing the output

Here is the Dredd configuration file, with some properties removed for clarity:

`example-bi-directional-provider-dredd/dredd.yml`

```
...
language: nodejs
server: npm start
server-wait: 3
reporter: [markdown]
output: [./output/report.md]
loglevel: warning
config: ./dredd.yml
blueprint: ./oas/products.yml
endpoint: 'http://127.0.0.1:3001'
```

Dredd will start our provider (`npm start`), read in the OAS file (`./oas/products.yml`) and then issue requests and assert on responses to our locally running provider at `http://127.0.0.1:3001`.

## Check

Now we can run the tests:

1. `cd /root/example-bi-directional-provider-dredd`
2. `npm t`

Your ouput should look like this:

```
$ npm t

> product-service@1.0.0 test example-bi-directional-provider-dredd
> dredd


> product-service@1.0.0 start example-bi-directional-provider-dredd
> node server.js

Provider API listening on port 3001...
warn: API description parser warning in example-bi-directional-provider-dredd/oas/products.yml:14 (from line 14 column 9 to column 17): 'Request Body Object' contains unsupported key 'required'
warn: API description parser warning in example-bi-directional-provider-dredd/oas/products.yml:73 (from line 73 column 9 to column 15): 'Parameter Object' contains unsupported key 'schema'
warn: API description parser warning in example-bi-directional-provider-dredd/oas/products.yml:107 (from line 107 column 7 to column 27): 'Schema Object' contains unsupported key 'additionalProperties'
pass: POST (200) /products duration: 72ms
pass: GET (200) /products duration: 16ms
pass: GET (200) /product/10 duration: 24ms
complete: 3 passing, 0 failing, 0 errors, 0 skipped, 3 total
complete: Tests took 135ms
```

As you can see, Dredd has issued calls to all 3 endpoints and the tests are ✅.
