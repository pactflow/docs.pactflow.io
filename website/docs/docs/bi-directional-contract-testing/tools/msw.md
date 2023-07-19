---
title: Tooling integration - MSW
sidebar_label: MSW
---

:::note
Official PactFlow adapter
:::


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

> Create MSW (mock-service-worker) mocks and generate pact contracts from recorded interactions.

With [@pactflow/pact-msw-adapter - npm](https://www.npmjs.com/package/@pactflow/pact-msw-adapter)

:::info Did you know?
One of the quickest ways to see this in action in a full CI/CD flow, is to pick the MSW consumer, in our [mix & match Bi-Directional Quick-Start Guide](/docs/workshops/quick_starts/bdc)
:::
## Reference Links

- GitHub [https://github.com/pactflow/pact-msw-adapter](https://github.com/pactflow/pact-msw-adapter)
- NPM [@pactflow/pact-msw-adapter](https://www.npmjs.com/package/@pactflow/pact-msw-adapter)
- PactFlow MSW Bi-Directional [demo](/docs/examples/bi-directional/consumer/msw/) Project
- Initial Proposal [GitHub Issue](https://github.com/mswjs/msw/issues/572)

## Install


1. Install [MSW](https://mswjs.io/docs/getting-started/install)
2. Install [@pactflow/pact-msw-adapter](https://github.com/pactflow/pact-msw-adapter)


The following will install both `msw` and `@pactflow/pact-msw-adapter`

<Tabs groupId="packagemanager">
<TabItem value="npm" label="npm" >

```bash
npm install --save-dev msw @pactflow/pact-msw-adapter
```

</TabItem>
<TabItem value="yarn" label="yarn" >

```bash
yarn add --dev msw @pactflow/pact-msw-adapter
```

</TabItem>
</Tabs>


##  Define Mocks

Define your [MSW Mocks](https://mswjs.io/docs/getting-started/mocks)

<Tabs groupId="mswmocktype">
<TabItem value="rest" label="rest" >

[MSW Quick Start Reference - Rest-API](https://mswjs.io/docs/getting-started/mocks/rest-api)
   
```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/mocks/mockData.js
```
```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/mocks/handlers.js
```

</TabItem>
<TabItem value="graphql" label="graphql" >

[MSW Quick Start Reference - GraphQL](https://mswjs.io/docs/getting-started/mocks/graphql-api)

Not currently tested, please feel free to help contribute or let us know if you want to see it!

</TabItem>
</Tabs>



##  Integrate MSW

[MSW Quick Start Reference - Integrate MSW](https://mswjs.io/docs/getting-started/integrate) with your code


<Tabs groupId="msw">
<TabItem value="browser" label="browser" >

[MSW Quick Start Reference - Browser](https://mswjs.io/docs/getting-started/integrate/browser)

```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/mocks/browser.js
```
```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/index.js
```

</TabItem>
<TabItem value="server" label="server" >

[MSW Quick Start Reference - Node](https://mswjs.io/docs/getting-started/integrate/node)  

```javascript reference
https://github.com/pactflow/example-bi-directional-consumer-msw/blob/master/src/mocks/server.js
```

</TabItem>
</Tabs>



##  Setup pact-msw-adapter 

We need to setup pact-msw-adapter in our test framework setup hooks.

Please read the reference guide, for up-to-date information on `setupPactMswAdapter` configuration options:

[pact-msw-adapter Reference](https://github.com/pactflow/pact-msw-adapter/blob/main/README.md)  


<Tabs groupId="msw">
<TabItem value="browser" label="browser" >

The adapter uses by default node’s filesystem to write pact files to disk. This makes it incompatible with browser environments where fs is not available. To overcome this, [pact-msw-adapter allows for defining custom functions](https://github.com/pactflow/pact-msw-adapter#custom-file-writers) for writing files to disk.

This example uses Cypress's `cy.writeFile` method

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/cypress/integration/pactFromMswWorker.spec.js#L1-L75
 ```

</TabItem>
<TabItem value="server" label="server" >

This example uses Jest

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/setupTests.js
 ```

</TabItem>
</Tabs>


##  Write your tests

No additional magic is needed. You can just start writing your tests.

<Tabs groupId="msw">
<TabItem value="browser" label="browser" >

This example uses Cypress

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/cypress/integration/pactFromMswWorker.spec.js#L75-L82
 ```

</TabItem>
<TabItem value="server" label="server" >

This example uses Jest

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/api.spec.js
 ```

</TabItem>
</Tabs>


Run your tests in the usual manner for your framework.


:::success Well done!

You should now see a Pact file generated in your specified folder; the default is `./msw-generated-pacts` - These are now ready for upload to the PactFlow Platform.
:::
