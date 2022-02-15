---
title: Support policy
---


## Versioning

Pactflow On-Premises follows a [semantic versioning](https://semver.org/) policy for API changes. 

Further to this, any changes to the database schema or configuration that are backwards incompatible (eg. addition of a mandatory configuration setting with no default, or the deletion of a table) will only be introduced in a major version. Migration documentation will be included in the release notes for any major version, and any minor version that introduces optional configuration.

Bug fixes will only be applied to the most recent minor version.

Upgrades to the Docker base image will be performed in minor releases. Pactflow images will only be supported for Docker versions that are currently [in support](https://docs.docker.com/engine/install/#support) themselves (20.10.0 and later).

## Support period

Minor versions will be supported for a period of 6 months.

## Releases

Minor version releases are performed at 1-2 month intervals. Major and patch version releases are performed as required.
