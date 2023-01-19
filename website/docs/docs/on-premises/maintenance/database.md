---
title: Database
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

### Understanding the "keep" selectors

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

* keep all versions on the main branch of each pacticipant that are less than 30 days old: `{"max_age": 30, "mainBranch": true }`
* keep the latest version from each pacticipant's branch: `{"branch": true, "latest": true }`
* keep the latest version for each pacticipant/tag: `{ "latest": true, "tag": true }`
* keep all versions less than 30 days old: `{"max_age": 30}`
* keep all currently deployed versions: `{ "deployed": true }`
* keep all released and currently supported versions: `{ "released": true }`
* keep all versions for Foo app: `{"pacticipant": "Foo"}`
* keep the latest version for each pacticipant: `{ "latest": true }`
* keep all versions tagged "develop" for Foo app: `{"pacticipant": "Foo", "tag": "develop"}`

The selectors combine by "OR", meaning that a version is kept if it matches any of the selectors. So `[{"max_age": 30}, { "branch": true, "latest": true }, { "deployed": true }]` would be "keep every version younger than 30 days old, or is the latest version for its branch, or is currently deployed".

#### Recommended starting configuration for keep selectors

The following are the default keep selectors specified in the clean tool, and they are a good place to start. (Remember, only one of the selectors needs to be matched to keep the version).

* Keep all versions under 90 days old - `{ "max_age": 90 }`
* Keep all versions that are the latest for their branch - `{ "branch": true, "latest": true }`
* Keep all versions that are the latest for their tag - `{ "tag": true, "latest": true }`
* Keep all the currently deployed versions - `{ "deployed": true }`
* Keep all the released and currently supported versions - `{ "released": true }`
* Keep the latest version for every pacticipant - `{ "latest": true }`

Notes:

* When you deploy an application to production, the relevant pacticipant version needs to be recorded as deployed in Pactflow, so you need to ensure that you keep any version that you're likely to deploy (or rollback to). Specify a max_age value that is at minimum the number of days it takes between a commit being created and that commit being deployed (with a very comfortable margin of error) and any branch that you deploy from. A reasonable max_age value might be 90 days for the `main` branch. eg. `{"max_age": 90, "mainBranch": true }`
* If an application is not under active development, a selector that keeps versions by age limit might not actually select any versions. To ensure that we don't lose those critical "latest" versions for our main line of development or our deployed environments, add a selector with `{"mainBranch": true, "latest": true }`, or keep the latest version from each branch by specifying `{"branch": true, "latest": true }`.


### Initial clean strategy

If you have a very large database, and you are just now enabling the clean, the initial clean up might take some time. To ensure that the clean does not have an impact on the performance of Pactflow, it is recommended to set the cron schedule to something quite regular for the first day (eg. every 2 minutes), and set the clean limit quite low (eg. 100). Once the task has stopped deleting any more records, set the schedule back to something like once/twice a day, and make sure the clean limit is higher than the number of new versions you expect in that time period.

### Execution

The database clean tool comes built into the Pactflow On-Premises Docker image. The Docker container should be executed in a compute environment such as AWS Batch. It should run on a regular schedule (eg. daily) and be configured to delete at least as many application versions as are expected to be created between each clean execution.

To execute the clean task, run the Docker container with the appropriate environment variables (documented below), the Pactflow license mounted, and the entrypoint set to `db-clean`.

eg.
```sh
docker run --rm \
           --entrypoint db-clean \
           --volume ./pactflow-onprem.lic:/home/pactflow-onprem.lic \
           --env PACTFLOW_DATABASE_URL="..." \ # appropriate environment variables here
           quay.io/pactflow/enterprise
```

This example Docker Compose file shows an example configuration. It can be run by saving the contents as `docker-compose.yml` and then running `docker compose up` in the same directory. Note that a Pactflow license file is required to run the Pactflow container.

There will be no data in the database to delete, but the logs will show that the clean process has run.

```yml
version: "3"

services:
  postgres:
    image: postgres:13-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres

  clean:
    image: quay.io/pactflow/enterprise
    depends_on:
      - postgres
    environment:
      PACTFLOW_DATABASE_URL: "postgres://postgres:password@postgres/postgres"
      PACTFLOW_DATABASE_SSLMODE: "disable"
      PACTFLOW_DATABASE_CLEAN_DELETION_LIMIT: "500"
      PACTFLOW_SQL_LOG_WARN_DURATION: "60"
      # Keep the latest version for every pacticipant branch, and all versions less than 30 days old, and anything deployed or released
      PACTFLOW_DATABASE_CLEAN_KEEP_VERSION_SELECTORS: "[{ \"branch\": true, \"latest\": true }, {\"max_age\": 30 }, {\"deployed\": true }, {\"released\": true }]"
      PACTFLOW_LOG_LEVEL: "INFO"
      PACTFLOW_SQL_LOG_LEVEL: "DEBUG"
    entrypoint: dockerize
    # There will be no data in the database to delete, but the logs will show that the clean process has run
    command: -wait tcp://postgres:5432 sh -c 'db-migrate && db-clean'
    volumes:
      - ./pactflow-onprem.lic:/home/pactflow-onprem.lic

```

### Configuration

<!--
     This is a generated file. Do not edit it directly.
     Please update app_onprem/environment_variables.yml instead and then run
     app_onprem/script/generate-configuration-docs.rb
-->


#### PACTFLOW_LOG_LEVEL

The Pactflow application log level

**Required:** false<br/>
**Default:** `INFO`<br/>
**Allowed values:** `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`<br/>

#### PACTFLOW_LOG_FORMAT

The Pactflow application log format

**Required:** false<br/>
**Default:** `json`<br/>
**Allowed values:** `json`, `default`, `color`<br/>
**More information:** https://github.com/rocketjob/semantic_logger/tree/master/lib/semantic_logger/formatters<br/>

#### PACTFLOW_SQL_LOG_LEVEL

The log level that will be specified when the SQL query statements are logged.

**Required:** false<br/>
**Default:** `NONE`<br/>
**Allowed values:** `NONE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`<br/>

#### PACTFLOW_DATABASE_URL

The fully qualifed database connection string. If using Postgres on RDS with IAM authentication, the scheme must be `postgresiam` and the port must also be set.

**Required:** if separate host, name, username, password environment variables are not set<br/>
**Example:** `postgresql://username:password@host:port/database`<br/>

#### PACTFLOW_DATABASE_ADAPTER

The database adapter to use. Use `postgresiam` when using Postgres on RDS with IAM authentication (rather than username/password authentication).

**Required:** false<br/>
**Default:** `postgres`<br/>
**Allowed values:** `postgres`, `postgresiam`<br/>

#### PACTFLOW_DATABASE_USERNAME

The database username

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

#### PACTFLOW_DATABASE_PASSWORD

The database password

**Required:** if PACTFLOW_DATABASE_URL is not set, unless using Postgres on RDS with IAM authentication<br/>

#### PACTFLOW_DATABASE_HOST

The database host

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

#### PACTFLOW_DATABASE_PORT

The database port

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

#### PACTFLOW_DATABASE_NAME

The database name

**Required:** if PACTFLOW_DATABASE_URL is not set<br/>

#### PACTFLOW_DATABASE_SSLMODE

The Postgresql ssl mode. Note, if using Postgres on AWS RDS with IAM authentication, this must be `require`.

**Required:** false<br/>
**Default:** `require`<br/>
**Allowed values:** `disable`, `allow`, `prefer`, `require`, `verify-ca`, `verify-full`<br/>
**More information:** https://ankane.org/postgres-sslmode-explained<br/>

#### PACTFLOW_DATABASE_CLEAN_DELETION_LIMIT

Only required when running the `db-clean` entrypoint in the Pactflow Docker container.
The maximum number of records to delete at a time from each of the (categories of removable data)[#categories-of-removable-data].
Should be set to a number higher than the expected number of application versions that will be created between each clean,
but not so high that it will impact on the performance of the application while it is running. You may need to run tests find the optimal number to use in your environment.

**Required:** false<br/>
**Default:** `500`<br/>

#### PACTFLOW_DATABASE_CLEAN_KEEP_VERSION_SELECTORS

Only required when running the `db-clean` entrypoint in the Pactflow Docker container.
A JSON string containing a list of the "keep" selectors described in (Understanding the keep selectors)[#understanding-the-keep-selectors].
To ensure the integity of the Pactflow data, the selectors `{ "deployed": true }` and `{ "released": true }` will be automatically added to the selector list if they are not specified.
Remember to escape the quotes if necessary in your configuration files.

**Required:** false<br/>
**Default:** `[{ "max_age": 90 }, { "branch": true, "latest": true }, { "tag": true, "latest": true }, { "deployed": true }, { "released": true }, { "latest": true }]`<br/>

#### PACTFLOW_DATABASE_CLEAN_OVERWRITTEN_DATA_MAX_AGE

Only required when running the `db-clean` entrypoint in the Pactflow Docker container.
The maximum number of days to keep "overwritten" data as described in (categories of removable data)[#categories-of-removable-data]

**Required:** false<br/>
**Default:** `7`<br/>

#### PACTFLOW_DATABASE_CLEAN_DRY_RUN

Only required when running the `db-clean` entrypoint in the Pactflow Docker container.
When set to `true`, the `db-clean` process will not delete any data, but will instead log the data that would be deleted if dry run was not enabled.
Use this to test that the container is configured correctly.

**Required:** false<br/>
**Default:** `false`<br/>
**Allowed values:** `true`, `false`<br/>

#### AWS_REGION

Required for running Postgres on RDS with IAM authentication. This must be set to the AWS region where the RDS database instance is running.

**Required:** false<br/>



