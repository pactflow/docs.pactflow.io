---
title: Deploying and Releasing
sidebar_label: Deploying and Releasing
---

The Pactflow needs to know which versions of each application are in each environment so it can determine whether a particular application version is [safe to deploy](https://docs.pact.io/pact_broker/can_i_deploy).

To notify Pactflow that an application version has been deployed or released, the `pact-broker record-deployment` and `pact-broker record-release` commands are provided by the [Pact Broker CLI](https://docs.pact.io/pact_broker/client_cli).

"Deployed versions" and "released versions" are very similar, but are modelled slightly differently in Pactflow. The difference between `record-deployment` and `record-release` is that:

* `record-deployment` automatically marks the previously deployed version as undeployed, and is used for APIs and consumer applications that are deployed to known instances.
* `record-release` does NOT change the status of any previously released version, and is used for mobile applications and libraries that are made publicly available via an application store or repository.

"Deployed versions" and "released versions" are different resource types in Pactflow, and an application version may be both deployed and released. For example, a mobile phone application version may be recorded as deployed to a mobile device for automated testing in a test environment, and then recorded as released to an app store in a production environment.

## Environments

Before you can record a deployment or a release, you must create the environment in Pactflow. To get you you started quickly, the `test` and `production` environments are pre-populated.

To create a new environment, you can use the [Environments page](/docs/user-interface/settings/environments) or use the following [command](https://docs.pact.io/pact_broker/client_cli/readme#create-environment) from the Pact Broker CLI.

    $ pact-broker create-environment --name NAME --display-name DISPLAY_NAME \
      [--no-production|--production]

eg.

    $ pact-broker create-environment --name uat --display-name UAT --no-production
    $ pact-broker create-environment --name customer-1-production --display-name "Customer 1 Production" --production


Once the enviroment is created, ensure the team and application are [configured correctly](/docs/user-interface/settings/environments#recording-deployments-and-releases).

### Handling conflicting views of what an "environment" is

For can-i-deploy to work correctly, every team and Pactflow must have the same shared understanding of what an "environment" is. Defining the bounds of an environment can be a tricky thing. A consumer team may have multiple deployed consumer applications that all share the same instance of the provider. From the consumer team's point of view, there are multiple environments, but from the provider team's point of view, there is one. For Pactflow to operate correctly, in this situation, you have two options:

1. Create one environment resource in Pactflow, and use the `--application-instance` feature described [below](#application-instances), and give each consumer application instance its own identifier. This would work well if there was only one application in each of the sub environments. 
2. If there are just too many applications in each of the sub environments to want to use the application instance approach, then you can create an environment resource for each sub environment, and when the shared application is deployed, call `record-deployment` once for each sub environment. Before deploying the shared application, the `can-i-deploy` command would need to be called for each sub environment, and it should only deploy if all the results were positive.


## Deployments

### Recording deployments

The `pact-broker record-deployment` command should be called at the very end of the deployment process, when there is no chance that the deployment might fail, and there are no more instances of the previous version running. When `record-deployment` is called, the previously deployed version for that application/environment is automatically marked as no longer deployed, so there is no need to make a separate call for this.

#### Examples

```
record-deployment --pacticipant foo --version 6897aa95e --environment production

record-deployment --pacticipant foo --version 6897aa95e --environment production \
                  --application-instance customer-1

record-deployment --pacticipant foo --version 6897aa95e --environment test \ 
                  --application-instance iphone-2
```

#### Application instances

Setting the "application instance" attribute is only necessary when there are multiple instances of an application *permanently* deployed to the same environment at the same time (ie. not just temporarily during a rolling migration). An example of this might be when you are maintaining on-premises consumer applications for multiple customers that all share the same backend API instance, or when you have more than one mobile device running the same application in a test environment, all pointing to the same test API instance.

The "application instance" field is used to distinguish between deployed versions of an application within the same environment, and most importantly, to identify which previously deployed version has been replaced by the current deployment. Pactflow only allows one unique combination of pacticipant/environment/application instance to be considered the "currently deployed" one, and any call to record a deployment will cause the previously deployed version with the same pacticipant/environment/application instance to be automatically marked as undeployed (mimicking the real world process of "deploying over" a previous version). Note that a "null" (anonymous) application instance is considered to be a distinct value, so if you record a deployment with no application instance set, then record a deployment with an application instance set, you will have two different deployed versions in that environment.

The application instance should *not* be used to model blue/green or other forms of no-downtime deployments where there are two different application versions deployed temporarily at once during the deployment phase. See the next section for more information.

##### Why the application instance should not be used for long running deployments

When executing a rolling deployment (an approach for deploying with no downtime where there are multiple application instances that are deployed to sequentially), there will be a period of time when there are 2 different versions of an application in the environment at the same time. Even if there is a long running deployment, the `record-deployment` should still be called at the end of the deployment, and there is no need to let the Broker know of newer application version until the deployment process is complete.

Why is this so?

Imagine an application, Consumer, which depends on application, Provider. Each of them has version 1 deployed to production. Consumer version 2 is waiting for a new feature to be supported in Provider version 2.

Provider deploys version 2 using a rolling deployment, during which time the response to Consumer's request might come from Provider version 1 or it might come from version 2. Technically, both versions of Provider could be said to be in production at this point in time. However, Consumer v2 cannot be deployed safely to production _until Provider v1 is no longer in production_. This is why there is no advantage to recording Provider v2 as being in production during the time period of the deployment. It's not just that Consumer v2 requires Provider v2 to be in production, it also requires Provider v1 to NOT be in production, and that can't be guaranteed until the deployment is complete.

#### Handling rollbacks

If you need to rollback to a previous version, call `record-deployment` again with the version that you are rolling back to.

### Recording undeployments

Recording undeployments is not usually necessary, because the `record-deployment` command automatically marks any application version that was deployed to the same application instance as undeployed.

If however, an application instance is being permanently removed from an environment, rather than just being deployed over, you can use `pact-broker record-undeployment`.

#### Examples

```
record-undeployment --pacticipant my-retired-service --environment test
                    
record-undeployment --pacticipant foo --environment test \
                    --application-instance mobile-2
```

## Releases

### Recording releases

The `pact-broker record-release` command should be called once an application version has been successfully made available in a production environment (eg. via a Github release, made available on an app store, or released to a Maven repository etc.). Unlike recording a deployment, recording a release does not change the status of any previously released application versions, and there is no concept of a release "application instance".

`record-release` is generally only used for production environments.

#### Examples

```
record-release --pacticipant foo-mobile-app --version 6897aa95e --environment production
```

### Recording support ended for a release

When a released application is deemed to be no longer supported, call `pact-broker record-support-ended`. This will remove it from consideration when checking if an integrated application is [safe to deploy](https://docs.pact.io/pact_broker/can_i_deploy).

#### Examples

```
record-support-ended --pacticipant foo-mobile-app --version 6897aa95e --environment production
```

## Using deployed and released versions

The use for the deployed and released versions is when using [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy). This is the command that is used to check if the version you are about to deploy into an environment has a successful verification result with each of the application versions that is already in the environment. 

eg.

```
pact-broker can-i-deploy --pacticipant Foo \
                         --version 617c76e8bf05e1a480aed86a0946357c042c533c \
                         --to-environment production
```
