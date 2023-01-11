---
title: Docker image registry
---

## Accessing the Enterprise Pactflow container registry

Docker images for our self-hosted Pactflow Enterprise product are hosted at [Quay](http://quay.io). We will provide Quay.io access for you when signing up to the product. 

### User Account Access

:::note
If you are on a Pactflow trial, creating a RedHat account is **not** required. You will be issued a separate set of credentials (see [CI Access](#ci-access) below) by your Account Manager for the duration of the trial.
:::

To set you up with console access, you will need to create a [RedHat account](https://quay.io/signin/). Choose "Register for a RedHat account" and once comwpleted, provide the username/email address to us to add you to the registry.

Once we have granted access to your given email address, you should receive an email from Red Hat Quay confirming access to the Pactflow organisation.

### CI Access

In additional to user access, we will create you one or more [Robot Accounts](https://docs.quay.io/glossary/robot-accounts.html) for use in CI.

## Getting started

Once we have created you a new user, you will receive an email from Quay.io inviting you to join a new team and a license file from us. You can setup the new account as follows:

1. Make sure you have received a Pactflow on-premises license file from your Account Manager
1. You should receive an email from Red Hat Quay, requesting you join a team `pactflow/<your team>`:

   ![Join Pactflow repository email](/on-premises/quay-join-team-email.png)

1. Follow the link in your email to login to an existing accoun


1. You will be added to the correct team and you should then see our Enterprise repository (click [Repositories](https://quay.io/repository/) in the menu bar to see this):

   ![Completed signup](/on-premises/quay-completed.png)

1. You should now have access to the `enterprise` repository in the `pactflow` organisation.

1. You can now sign in with your account (in addition to your Robot Account) to quay to pull docker images. See [getting started with Quay.io](https://docs.quay.io/solution/getting-started.html) for more on this.

## Downloading the image

With your personal credentials or Robot token (provided by your Pactflow Account Manager), you can login to your docker management system and pull the image:

```sh
docker login -u="<username>" -p="<password>" quay.io # you can use either the robot token or your user credentials here
docker pull quay.io/pactflow/enterprise
```
