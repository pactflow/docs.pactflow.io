---
title: Support policy
---

## Versioning

PactFlow On-Premises follows a [semantic versioning](https://semver.org/) policy for API changes.

Further to this, any changes to the database schema or configuration that are backwards incompatible (eg. addition of a mandatory configuration setting with no default, or the deletion of a table) will only be introduced in a major version. Migration documentation will be included in the release notes for any major version, and any minor version that introduces optional configuration.

### Base image upgrades

Upgrades of the Docker base image will be performed in minor releases (eg. from `alpine3.14` to `alpine 3.15`). PactFlow images will only be supported for Docker versions that are currently [in support](https://docs.docker.com/engine/install/#support) themselves (20.10.0 and later).

## Support period

PactFlow application bug fixes will be applied to the latest minor release only.

Minor versions will receive patches for security vulnerabilities for a period 9 months from the release date.

## Releases

Minor version releases are performed at 1-2 month intervals. Major and patch version releases are performed as required according to our versioning policy.

## Subscribing to updates

Subscribe to our [RSS](/notices/rss.xml), [Atom](/notices/atom.xml) or [JSON](/notices/feed.json) feeds for updates on new on-premises releases and important security announcements.

## Asking for help

Current customers may open a [support ticket](https://support.smartbear.com/pactflow/message/) with the following information:

* The current version of your PactFlow instance (the version of your application is displayed in the footer. If the application is not able to start, the version of the docker image you are running is sufficient)
* A detailed description of what you're trying to achieve, what your expected outcome is, and what the actual behaviour is.
* The current configuration given to your application 
* A log file taken from when the problem occurred, where the application log level has been set to `DEBUG` 
* If you're trying to demonstrate a problem or diagnose a bug, the best possible thing you can do is provide a [minimal reproducible example](https://stackoverflow.com/help/minimal-reproducible-example). 
* Any other information you think could help us diagnose the issue

### Scope of PactFlow support

PactFlow is distributed via an industry standard Docker image, meaning that it can be deployed to a wide variety of orchestration tools such as Kubernetes and OpenShift, and runtime environments such as AWS, GCP or Azure.

Given this flexibility, we are unable to provide support for components that live outside of the PactFlow application as there are too many factors outside of our control to be able to advise you appropriately.

**Examples of things we can help you with**

* Application configuration issues
* Interpreting and clarifying application logs
* Diagnosing issues with the application behaviour

**Examples of things we can't help you with**

* Networking issues
* Docker orchestration setup (e.g. Helm charts, EKS)
* Cloud or infrastructure automation tools (e.g. Cloudformation, Terraform, Ansible)

Of course, there are areas where the boundaries are not so clear - such as security reports highlighted by an infosec tool, or issues relating to your IDP or database. This is an area of our shared responsibility and we will do our best to support you.