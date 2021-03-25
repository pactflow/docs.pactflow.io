---
title: Installation checklist
---

## 1. Pactflow license file

The Pactflow on-premises version requires a license file to run. You should have received this from us during the
on-boarding process. If not, please contact us at support@pactflow.io.

## 2. Run Docker Compose example

See the [Docker Compose example](/docs/on-premises/docker-compose-example).

## 3. Choose the domain name for your Pactflow On-Premises application

eg. `https://pactflow.mycompany.com`

You will need this for the next step.

## 4. Configure identity provider

Configure the Pactflow On-Premises application in your identity provider. See the [Azure Active Directory](/docs/on-premises/authentication/saml#configuring-azure-active-directory) documentation.

## 5. Deploy Pactflow On-Premises application stack

* Configure the [Pactflow Docker image](/docs/on-premises/docker-image-registry) to be pulled from Quay.
* Use the [environment variable templates](/docs/on-premises/environment-variables/templates) to create the appropriate deployment configuration artifacts for the Pactflow Docker image (eg. Cloudformation template, Helm chart etc.)
* Ensure the [compute resources](/docs/on-premises/system-requirements) have the appropriate specifications.
* Create a [PostgreSQL database](/docs/on-premises/database)
* Ensure the [network](/docs/on-premises/network-configuration) is configured appropriately.
* Ensure the [logs](/docs/on-premises/logging) are forwarded to a log aggregation service.
* Make sure the [license file](/docs/on-premises/license) is mounted into the running containers.
* Ensure you have [load tested](load-testing) the system and have confidence the system can handle your baseline load, and can scale with increased demand
