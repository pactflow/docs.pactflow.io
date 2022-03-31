---
custom_edit_url: https://github.com/pactflow/example-consumer-js-sns/edit/master/README.md
title: Example Node AWS SNS Consumer
sidebar_label: Example Node AWS SNS Consumer
---

<!-- This file has been synced from the pactflow/example-consumer-js-sns repository. Please do not edit it directly. The URL of the source file can be found in the custom_edit_url value above -->

## Source Code

https://github.com/pactflow/example-consumer-js-sns


[![Build Status](https://github.com/pactflow/example-consumer-js-sns/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-consumer-js-sns/actions)

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer-js-sns/branches/master/latest-version/can-i-deploy/to-environment/production/badge.svg)](https://testdemo.pactflow.io/pacticipants/pactflow-example-consumer-js-sns/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

[![Pact Status](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest/badge.svg?label=consumer)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest) (latest pact)

[![Pact Status](https://testdemo.pactflow.io/matrix/provider/pactflow-example-provider-js-sns/latest/master/consumer/pactflow-example-consumer-js-sns/latest/master/badge.svg?label=consumer)](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest/prod) (prod/prod pact)

This is an example of a NodeJS AWS SNS consumer that uses Pact, [Pactflow](https://pactflow.io) and Travis CI to ensure that it is compatible with the expectations its consumers have of it.

It is using a public tenant on Pactflow, which you can access [here](https://testdemo.pactflow.io) using the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M`/`O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`. The latest version of the Example Consumer/Example Provider pact is published [here](https://testdemo.pactflow.io/pacts/provider/pactflow-example-provider-js-sns/consumer/pactflow-example-consumer-js-sns/latest).

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

* See the canonical consumer example here: https://github.com/pactflow/example-consumer.
* See also the full [Pactflow CI/CD Workshop](https://docs.pactflow.io/docs/workshops/ci-cd) for which this can be substituted in as the "consumer".

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

See also the [Pactflow CI/CD Workshop](https://github.com/pactflow/ci-cd-workshop) for more background.

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

## SAM Application Documentation

**Note: This is the default readme contents created from a `sam init`**

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code.
- `template.yml` - A template that defines the application's AWS resources.

Resources for this project are defined in the `template.yml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

If you prefer to use an integrated development environment (IDE) to build and test your application, you can use the AWS Toolkit.
The AWS Toolkit is an open-source plugin for popular IDEs that uses the AWS SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds step-through debugging for Lambda function code.

To get started, see the following:

* [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
* [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## Deploy the sample application

The AWS SAM CLI is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the AWS SAM CLI, you need the following tools:

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 12](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modified IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
my-application$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke SNSPayloadLogger --event events/event-sns.json
```

## Add a resource to your application

The application template uses AWS SAM to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources, such as functions, triggers, and APIs. For resources that aren't included in the [AWS SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use the standard [AWS CloudFormation resource types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

Update `template.yml` to add a dead-letter queue to your application. In the **Resources** section, add a resource named **MyQueue** with the type **AWS::SQS::Queue**. Then add a property to the **AWS::Serverless::Function** resource named **DeadLetterQueue** that targets the queue's Amazon Resource Name (ARN), and a policy that grants the function permission to access the queue.

```
Resources:
  MyQueue:
    Type: AWS::SQS::Queue
  SNSPayloadLogger:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/handlers/sns-payload-logger.snsPayloadLoggerHandler
      Runtime: nodejs12.x
      DeadLetterQueue:
        Type: SQS
        TargetArn: !GetAtt MyQueue.Arn
      Policies:
        - SQSSendMessagePolicy:
            QueueName: !GetAtt MyQueue.QueueName
```

The dead-letter queue is a location for Lambda to send events that could not be processed. It's only used if you invoke your function asynchronously, but it's useful here to show how you can modify your application's resources and function configuration.

Deploy the updated application.

```bash
my-application$ sam package \
    --output-template-file packaged.yaml \
    --s3-bucket BUCKET_NAME
my-application$ sam deploy \
    --template-file packaged.yaml \
    --stack-name sam-app \
    --capabilities CAPABILITY_IAM
```

Open the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) page of the Lambda console, and choose your application. When the deployment completes, view the application resources on the **Overview** tab to see the new resource. Then, choose the function to see the updated configuration that specifies the dead-letter queue.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, the AWS SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs that are generated by your Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

**NOTE:** This command works for all Lambda functions, not just the ones you deploy using AWS SAM.

```bash
my-application$ sam logs -n SNSPayloadLogger --stack-name sam-app --tail
```

**NOTE:** This uses the logical name of the function within the stack. This is the correct name to use when searching logs inside an AWS Lambda function within a CloudFormation stack, even if the deployed function name varies due to CloudFormation's unique resource name generation.

You can find more information and examples about filtering Lambda function logs in the [AWS SAM CLI documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name sam-app
```

## Resources

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

Next, you can use the AWS Serverless Application Repository to deploy ready-to-use apps that go beyond Hello World samples and learn how authors developed their applications. For more information, see the [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/) and the [AWS Serverless Application Repository Developer Guide](https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html).
