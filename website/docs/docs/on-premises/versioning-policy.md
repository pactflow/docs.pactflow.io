---
title: Versioning policy
---

Pactflow On-Premesis follows a [semantic versioning](https://semver.org/) policy for API changes. 

Further to this, any changes to the database schema or configuration that are backwards incompatible (eg. addition of a mandatory configuration setting with no default or the deletion of a table) will only be introduced in a major version. Migration documentation will be included in the release notes for any major version, and any minor version that introduces optional configuration.

Bug fixes will only be applied to the most recent minor version, unless there are specific reasons why it needs to be backported to a previous minor version.
