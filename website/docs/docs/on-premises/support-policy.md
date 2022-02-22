---
title: Support policy
---


## Versioning

Pactflow On-Premises follows a [semantic versioning](https://semver.org/) policy for API changes. 

Further to this, any changes to the database schema or configuration that are backwards incompatible (eg. addition of a mandatory configuration setting with no default, or the deletion of a table) will only be introduced in a major version. Migration documentation will be included in the release notes for any major version, and any minor version that introduces optional configuration.

### Base image upgrades

Upgrades of the Docker base image will be performed in minor releases (eg. from `alpine3.14` to `alpine 3.15`). Pactflow images will only be supported for Docker versions that are currently [in support](https://docs.docker.com/engine/install/#support) themselves (20.10.0 and later).

## Support period

Pactflow application bug fixes will be applied to the latest minor release only.

Minor versions will receive patches for security vulnerabilities for a period 9 months from the release date.

## Releases

Minor version releases are performed at 1-2 month intervals. Major and patch version releases are performed as required according to our versioning policy.
