---
title: Docker image registry
---

## Accessing the Enterprise Pactflow container registry

Docker images for our self-hosted Pactflow Enterprise product are hosted at [Quay](http://quay.io). We will provide Quay.io access for you when signing up to the product. To do so we will need one of two things:

1. An email address to invite you 
2. The username of an existing Quay.io account.

In most cases, we expect to create a new user (1). Once we have granted access to your given email address, you should receive an email from Quay, where you will need to create a new account and setup credentials to download the image.

## Getting started
Once we have created you a new user, you will receive an email from Quay.io inviting you to join a new team and a license file from us. You can setup the new account as follows:

1. Make sure you have received a Pactflow on-premises license file.
1. Follow the link in your email and create a new Quay account
1. Head to the [Repositories](https://quay.io/repository/) page 
1. Click on your user (e.g. https://quay.io/user/mfellowstestquaycustomer)
1. Go to your Robot Accounts tab
1. Click "Create Robot Account"
1. Complete the details
1. Choose "View credentials"
1. Copy the relevant credentials

*Watch the following video for a short demonstration of creating an account and setting up a CI token.*

[![Getting Started Video](http://img.youtube.com/vi/-GedqnmKDRk/0.jpg)](https://www.youtube.com/watch?v=-GedqnmKDRk "Pactflow Quay.io account creation")

## Downloading the image

Once you have created your CI token, you can login to your docker management system with the username and password created above and then pull the image:

```sh
docker pull quay.io/pactflow/enterprise
```
