---
title: Maintenance
---

<!--
Copied from https://github.com/pact-foundation/docs.pact.io/edit/master/website/docs/pact_broker/administration/maintenance.md
-->

## Automatic data clean up

Performance can degrade when too much data accumulates in the Pactflow database. Luckily, a lot of the data in a Pactflow instance is "unreachable" and can be removed without affecting the way it operates functionally, as generally speaking, the application (pacticipant) versions that are referenced in the verification and can-i-deploy tasks are either the latest for their branch, or a fairly recent version of the main line of development (eg. when deploying commit `193d71a4` of the `main` branch to `production`) or are marked as deployed/released.

As of version 1.22.0 of the Docker Pactflow images, an automatic "clean" feature has been included in the image.

### Categories of removable data

A configurable task will run on a cron schedule of your choosing to remove:

* Overwritten data for application versions
  * Overwritten contracts (these are created when a contract is published with the same consumer version but different content from a previous publication - it shouldn't happen if following best practice, and there is a configuration option to stop this occurring, but it is technically possible to do)
  * Duplicate verifications (this happens when verification results for the same pact version content are published by the same provider version multiple times - this can happen quite often under normal operation)
* Historical webhook execution data (except for the very latest execution for each consumer/provider/event)
* Application versions and their associated tags/pacts/verifications/webhooks that not in the configurable "keep" list (more on this below).

### How the application version cleaning works

To ensure that the data that is still in use is not deleted, a list of "keep" selectors must be configured to specify which application versions (and associated data) should be kept. Any application version not selected by one or more of the keep selectors will (eventually) be deleted. To ensure that the clean up task itself does not impact the performance of the Broker, a limit is placed on the number of application versions that will be deleted at one time. The task will first identify all the application versions to keep, exclude those records, and then delete the oldest \[configurable number\] of application versions and their associated contracts, verifications, tags, webhook executions, and any orphan contract versions.

### Configuring the "keep" selectors

The keep selectors operate in a very similar way to the [consumer version selectors](https://docs.pact.io/pact_broker/advanced_topics/consumer_version_selectors/) used during verification. Each selector can have the following properties:

* `pacticipant`: the name of the pacticipant
* `branch`: the name of the branch as a string to indicate a particular branch, or a boolean `true` to indicate "any version associated with a branch"
* `tag`: the name of the tag as a string to indicate a particular tag, or a boolean `true` to indicate "any version with a tag"
* `latest`: if `true`, then the latest version matching the other selection properties is specified. If `false` or omitted, all versions matching the other selection properties are specified.
* `mainBranch`: if set to true, specifies all versions that belong to the pacticipant's configured main branch.
* `deployed`: if set to true, specifies all currently deployed pacticipant versions
* `released`: if set to true, specifies all released pacticipant versions that are currently in support
* `max_age`: the number of days since it was created, as an integer, for which to keep the application version.

The `pacticipant` and `max_age` property may be used in combination with the other tags. `max_age` and `latest` cannot be used together.

#### Examples

* keep all versions on the main branch of each pacticipant that are less than 30 days old: `{"max_age": 30, "mainBranch": true}`
* keep the latest version from each pacticipant's branch: `{"branch": true, "latest": true}`
* keep the latest version for each pacticipant/tag: `{ "latest": true, "tag": true }`
* keep all versions less than 30 days old: `{"max_age": 30}`
* keep all currently deployed versions: `{ "deployed": true }`
* keep all released and currently supported versions: `{ "released": true }`
* keep all versions for Foo app: `{"pacticipant": "Foo"}`
* keep the latest version for each pacticipant: `{ "latest": true }`
* keep all versions tagged "develop" for Foo app: `{"pacticipant": "Foo", "tag": "develop"}`

The selectors combine by "OR", meaning that a version is kept if it matches any of the selectors. So `[{"max_age": 30}, { "latest": true, "branch": true }, { "deployed": true }]` would be "keep every version that's less than 30 days old, or is the latest version for its branch, or is currently deployed".

#### Recommended starting configuration for keep selectors

The default keep selectors specified in the clean tool are are good place to start. (Remember, only one of the selectors needs to be matched to keep the version).

* Keep all versions under 90 days old - `{ "max_age": 90 }`
* Keep all versions that are the latest for their branch - `{ "branch": true, "latest": true }`
* Keep all versions that are the latest for their tag - `{ "tag": true, "latest": true }`
* Keep all the currently deployed versions - `{ "deployed": true }`
* Keep all the released and currently supported versions - `{ "released": true }`
* Keep the latest version for every pacticipant - `{ "latest": true }`

Notes:

* When you deploy an application to production, the relevant pacticipant version needs to be recorded as deployed in Pactflow, so you need to ensure that you keep any version that you're likely to deploy (or rollback to). Specify a max_age value that is at minimum the number of days it takes between a commit being created and that commit being deployed (with a very comfortable margin of error) and any branch that you deploy from. A reasonable max_age value might be 90 days for the `main` branch. eg. `{"max_age": 90, "mainBranch": true}`
* If an application is not under active development, a selector that keeps versions by age limit might not actually select any versions. To ensure that we don't lose those critical "latest" versions for our main line of development or our deployed environments, add a selector with `{"mainBranch": true, "latest": true}`, or keep the latest version from each branch by specifying `{"branch": true, "latest": true}`.


#### Initial clean strategy

If you have a very large database, and you are just now enabling the clean, the initial clean up might take some time. To ensure that the clean does not have an impact on the performance of Pactflow, it is recommended to set the cron schedule to something quite regular for the first day (eg. every 2 minutes), and set the clean limit quite low (eg. 100). Once the task has stopped deleting any more records, set the schedule back to something like once/twice a day, and make sure the clean limit is higher than the number of new versions you expect in that time period.

### Configuration options

See the [environment variable documentation here](/docs/on-premises/environment-variables#TODODODODOD)
