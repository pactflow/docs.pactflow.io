---
title: Docker image registry
---

## Accessing the Enterprise Pactflow container registry

Docker images for our self-hosted Pactflow Enterprise product are hosted at [Quay](http://quay.io). We will provide Quay.io access for you when signing up to the product. To do so we will need one of two things:

1. An email address to invite you
2. The username of an existing Red Hat account.

In most cases, we expect to create a new user (1). Once we have granted access to your given email address, you should receive an email from Red Hat Quay, where you will need to create a new account and setup credentials to download the image.

### CI Access

In additional to user access, we will create you one or more [Robot Accounts](https://docs.quay.io/glossary/robot-accounts.html) for use in CI.

## Getting started

Once we have created you a new user, you will receive an email from Quay.io inviting you to join a new team and a license file from us. You can setup the new account as follows:

1. Make sure you have received a Pactflow on-premises license file from your Account Manager
1. You should receive an email from Red Hat Quay, requesting you join a team `pactflow/<your team>`:

   ![Join Pactflow repository email](/on-premises/quay-join-team-email.png)

1. Follow the link in your email to login to an existing account, or to create a new RedHat login choose "Register for a Red Hat account":

   ![Login or register for a Red Hat account](/on-premises/quay-login-or-register.png)

1. Complete the registration process if required:

   ![Register for a Red Hat account](/on-premises/quay-register-form.png)

1. Once you have registered, you'll be logged in to Quay but may not have access to any repositories just yet:

   ![Empty repositories dashboard](/on-premises/quay-empty-dashboard.png)

1. Now that you have an account, return to your invitation email from step (2), and click "Join Team" again. You will be added to the correct team and you should then see our Enterprise repository (click [Repositories](https://quay.io/repository/) in the menu bar to see this):

   ![Completed signup](/on-premises/quay-completed.png)

1. You should now have access to the `enterprise` repository in the `pactflow` organisation.

1. You can now sign in to quay to pull docker images. See [getting started with Quay.io](https://docs.quay.io/solution/getting-started.html) for more on this.

## Downloading the image

With your personal credentials or Robot token (provided by your Pactflow Account Manager), you can login to your docker management system and pull the image:

```sh
docker pull quay.io/pactflow/enterprise
```
