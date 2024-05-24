---
custom_edit_url: https://github.com/pactflow/example-consumer-js-sns/edit/master/README.md
title: Example Node AWS SNS Consumer
sidebar_label: Example Node AWS SNS Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-js-sns repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-js-sns


[![Build Status](https://github.com/pactflow/example-consumer-js-sns/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-consumer-js-sns/actions)

[![Can I deploy Status](https://test.pactflow.io/pacticipants/pactflow-example-consumer-js-sns/branches/master/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://test.pactflow.io/pacticipants/pactflow-example-consumer-js-sns/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

[![Pact Status](https://test.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest/badge.svg?label=consumer)](https://test.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest) (latest pact)

[![Pact Status](https://test.pactflow.io/matrix/provider/pactflow-example-provider-js-sns/latest/master/consumer/pactflow-example-consumer-js-sns/latest/master/badge.svg?label=consumer)](https://test.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest/prod) (prod/prod pact)

This is an example of a NodeJS AWS SNS consumer that uses Pact, [PactFlow](https://pactflow.io) and GitHub Actions to ensure that it is compatible with the expectations its consumers have of it.

It is using a public tenant on PactFlow, which you can access [here](https://test.pactflow.io) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`. The latest version of the Example Consumer/Example Provider pact is published [here](https://test.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest).

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

* See the canonical consumer example here: https://github.com/pactflow/example-consumer.
* See also the full [PactFlow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

## Scenario

In the following diagram, we'll be testing the "Consumer", a Lambda function that receives product updates via the `product` SNS topic.

We need to be able to test that we are able to receive (consume) product events from the SNS topic as follows:

![SNS Architecture](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/docs/js-sns.png) 

## Theory

Modern distributed architectures are increasingly integrated in a decoupled, asynchronous fashion. Message queues such as ActiveMQ, RabbitMQ, SNS, SQS, Kafka and Kinesis are common, often integrated via small and frequent numbers of microservices (e.g. lambda).

Pact supports these use cases, by abstracting away the _protocol_ and focussing on the messages passing between them.

To reiterate: Pact does not know about the various message queueing technologies - there are simply too many! And more importantly, Pact is really about testing the _messages_ that pass between them, you can still write your standard _functional_ tests using other frameworks designed for such things.

When writing tests, Pact takes the place of the intermediary (MQ/broker etc.) and confirms whether or not the consumer is able to _handle_ a given event, or that the provider will be able to _produce_ the correct message.

### How to write tests?

We recommend that you split the code that is responsible for handling the protocol specific things - in this case the lambda and SNS input - and the piece of code that actually handles the payload.

You're probably familiar with layered architectures such as Ports and Adaptors (also referred to as a Hexagonal architecture). Following a modular architecture will allow you to do this much more easily:

![Code Modularity](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/docs/ports-and-adapters.png)

This code base is setup with this modularity in mind:

* [Lambda Handler](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/src/lambda/product.js)
* [Event Service](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/src/product/product.service.js)
* Business Logic
    * [Product](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/src/product.js)
    * [Repository](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/src/product.repository.js)

The target of our [consumer pact test](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/__tests__/unit/handlers/product.service.pact.test.js) is the [Event Service](https://raw.githubusercontent.com/pactflow/example-consumer-js-sns/master/src/product/product.service.js), which is responsible for consuming a Product update event, and persisting it to a database (the Repository).

See also:

* https://dius.com.au/2017/09/22/contract-testing-serverless-and-asynchronous-applications/
* https://dius.com.au/2018/10/01/contract-testing-serverless-and-asynchronous-applications---part-2/

## Pre-requisites

**Software**:

* [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)
* An AWS account (if you want to actual test and run the lambda function)
*  https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/

## Usage

See also the [PactFlow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop) for more background.

### Testing

* Run the unit tests: `npm t`
* Run a (local) lambda integration test: `npm run test:integration`

### Running

* Deploy the actual app: `./script/deploy.sh` (see below for more background)
* Publish a test event: `npm run publish`
* View the lambda logs: `npm run logs`

Here is some sample output publishing and viewing the logs:
```
➜  example-consumer-js-sns git:(master) ✗ npm run publish                                                                                                                                                                                                                                                    <aws:pact-dev>

> product-service@1.0.0 publish /Users/matthewfellows/development/public/example-consumer-js-sns
> ./scripts/publish.sh

finding topic
have topic: arn:aws:sns:ap-southeast-2:838728264948:pactflow-example-consumer-js-sns-ProductEvent-144XVHN8QP2D3, publishing message
{
    "MessageId": "735a2daa-7eaa-53d7-b362-75b0d9227708"
}

> product-service@1.0.0 logs /Users/matthewfellows/development/public/example-consumer-js-sns
> sam logs -n ProductEventHandler --stack-name pactflow-example-consumer-js-sns -t

2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:25:24.984000 START RequestId: 47e97e7d-52cf-4c83-9133-545749ed2750 Version: $LATEST
2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:25:25.012000 2020-11-03T00:25:24.988Z	47e97e7d-52cf-4c83-9133-545749ed2750	INFO	{
  Records: [
    {
      EventSource: 'aws:sns',
      EventVersion: '1.0',
      EventSubscriptionArn: 'arn:aws:sns:ap-southeast-2:838728264948:pactflow-example-consumer-js-sns-ProductEvent-144XVHN8QP2D3:efaf0845-3847-4b5d-a4b1-68f33ef524e8',
      Sns: [Object]
    }
  ]
}
2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:25:25.032000 END RequestId: 47e97e7d-52cf-4c83-9133-545749ed2750
2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:25:25.032000 REPORT RequestId: 47e97e7d-52cf-4c83-9133-545749ed2750	Duration: 48.28 ms	Billed Duration: 100 ms	Memory Size: 128 MB	Max Memory Used: 64 MB	Init Duration: 136.98 ms
```

If you edit the file `./scripts/publish.sh` to remove a valid property, or upload invalid JSON you will get something like this:

```
2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:36:23.376000 2020-11-03T00:36:23.376Z	3eb496cd-c663-4ae2-a717-8f261b7ad48c	ERROR	Invoke Error 	{"errorType":"AssertionError","errorMessage":"id is a mandatory field","code":"ERR_ASSERTION","generatedMessage":false,"expected":true,"operator":"==","stack":["AssertionError [ERR_ASSERTION]: id is a mandatory field","    at new Product (/var/task/src/product/product.js:5:5)","    at handler (/var/task/src/product/product.handler.js:7:23)","    at /var/task/src/service/product.js:10:44","    at Array.map (<anonymous>)","    at Runtime.lambda [as handler] (/var/task/src/service/product.js:10:33)","    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)"]}
2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:36:23.416000 END RequestId: 3eb496cd-c663-4ae2-a717-8f261b7ad48c
2020/11/03/[$LATEST]df9d6b71ef1e49789f4ebca64fc19270 2020-11-03T00:36:23.416000 REPORT RequestId: 3eb496cd-c663-4ae2-a717-8f261b7ad48c	Duration: 75.82 ms	Billed Duration: 100 ms	Memory Size: 128 MB	Max Memory Used: 65 MB
```


-------------
