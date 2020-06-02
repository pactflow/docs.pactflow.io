---
title: Installation checklist
---

## 1. Run Docker Compose example

See the [Docker Compose example](/docs/on-premises/docker-compose-example).

## 3. Choose the domain name for your Pactflow On-Premises application

eg. `https://pactflow.mycompany.com`

You will need this for the next step.

## 2. Configure identity provider

Configure the Pactflow On-Premises application in your identity provider. See the [Azure Active Directory](/docs/on-premises/authentication/saml#configuring-azure-active-directory) documentation.

## 3. Deploy Pactflow On-Premises application stack

* Configure the [Pactflow Docker image](/docs/on-premises/docker-image-registry) to be pulled from Quay.
* Use the [environment variable templates](/docs/on-premises/environment-variables/templates) to create the appropriate deployment configuration artifacts for the Pactflow Docker image (eg. Cloudformation template, Helm chart etc.)
* Ensure the [compute resources](/docs/on-premises/system-requirements) have the appropriate specifications.
* Create a [PostgreSQL database](/docs/on-premises/database)
* Ensure the [network](/docs/on-premises/network-configuration) is configured appropriately.
* Ensure the [logs](/docs/on-premises/logging) are forwarded to a log aggregation service.
