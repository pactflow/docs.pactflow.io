---
title: Tooling integration - MSW
sidebar_label: MSW
---

> Create MSW (mock-service-worker) mocks, and generate pact contracts from the recorded interactions.

With [@pactflow/pact-msw-adapter - npm](https://www.npmjs.com/package/@pactflow/pact-msw-adapter)


- GitHub [https://github.com/pactflow/pact-msw-adapter](https://github.com/pactflow/pact-msw-adapter)
- NPM [@pactflow/pact-msw-adapter](https://www.npmjs.com/package/@pactflow/pact-msw-adapter)
- Pactflow Example Project [demo](/docs/examples/bi-directional/consumer/msw/)
- Initial Proposal [GitHub Issue](https://github.com/mswjs/msw/issues/572)

## Install

```bash
npm install msw @pactflow/pact-msw-adapter --save-dev
# or
yarn add msw @pactflow/pact-msw-adapter --dev
```

1. Install [MSW](https://mswjs.io/docs/getting-started/install)
2. Install [@pactflow/pact-msw-adapter](https://github.com/pactflow/pact-msw-adapter)

##  Define Mocks

Define your [MSW Mocks](https://mswjs.io/docs/getting-started/mocks)


1. [Rest-API](https://mswjs.io/docs/getting-started/mocks/rest-api)
   
```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/mocks/mockData.js
```
```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/mocks/handlers.js
```

2. [GraphQL](https://mswjs.io/docs/getting-started/mocks/graphql-api)

Not currently tested.

##  Integrate MSW

[Integrate MSW](https://mswjs.io/docs/getting-started/integrate) with your code


1. [Browser](https://mswjs.io/docs/getting-started/integrate/browser)

```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/mocks/browser.js
```
```javascript reference
https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/index.js#L9-L11
```

2. [Node](https://mswjs.io/docs/getting-started/integrate/node)  

```javascript reference
https://github.com/pactflow/example-bi-directional-consumer-msw/blob/master/src/mocks/server.js
```

##  Setup pact-msw-adapter


1. Browser Based

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/cypress/integration/pactFromMswWorker.spec.js#L4-L81
 ```

2. Node Based

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/setupTests.js
 ```

##  Run your tests


1. Browser Based

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/cypress/integration/pactFromMswWorker.spec.js#L84-L89
 ```

2. Node Based

 ```javascript reference
 https://github.com/pactflow/pact-msw-adapter/blob/main/examples/react/src/api.spec.js
 ```
