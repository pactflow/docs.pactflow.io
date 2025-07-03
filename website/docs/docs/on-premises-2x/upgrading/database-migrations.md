---
title: Database migrations
---

## Auto migration

Schema migrations are run automatically on start up, unless the [PACTFLOW_DATABASE_AUTO_MIGRATE](../environment-variables#pactflow_database_auto_migrate) environment variable is set to `false`. Data migrations are also run automatically on start up, after the schema migrations, and ensure that any data inserted into the database by a previous version of the application are migrated. This allows you to perform no-downtime, rolling upgrades across your cluster, ensuring any data inserted into latest database schema by the nodes running the previous version of the application are safely migrated.

Each schema migration will only ever be applied to the database once. Each data migration is executed during every application start up, as this provides the simplest mechanism for ensuring that all data is correctly migrated during rolling deployments. If this is undesirable, then manual migrations can be performed.

## Manual migration

The migrations can be run manually against the database before upgrading the PactFlow Docker image if desired. The `db-migrate` entrypoint will run both the schema and the data migrations.

```sh
docker pull quay.io/pactflow/enterprise

# Identify the current version before migrating, in case a rollback is required
docker run --rm \
  --env PACTFLOW_DATABASE_URL="postgres://username:password@host:port/database" \
  --entrypoint db-version \
  quay.io/pactflow/enterprise

# Perform the migrations
docker run --rm \
  --env PACTFLOW_DATABASE_URL="postgres://username:password@host:port/database" \
  --entrypoint db-migrate \
  quay.io/pactflow/enterprise
```

To perform a manual no-downtime deployment that does not rely on the "auto migrate" feature:

1. Execute the `db-migrate` entrypoint from the Docker image of the desired version. This will run both the schema and data migrations.
2. In the Pactflow application environment variables, set the `PACTFLOW_DATABASE_AUTO_MIGRATE` environment variable to `false`, and update the Pactflow image version to the desired tag. Allow your container management system to apply the rollout of the new Docker image.
3. Execute the `db-migrate` entrypoint again. This will run only the data migrations, as the schema migrations have already run. It is necessary to run the data migrations again to ensure that any data that was inserted into the new schema via the old API (during the rolling upgrade) is correctly migrated.


## Rollback

To perform a manual rollback, first identify the number of the migration target using the PactFlow image with the tag you wish to rollback to.

```sh
TAG="<version of PactFlow you wish to rollback to>"
docker run --rm \
  --entrypoint /bin/sh \
  --volume $PWD/pactflow-onprem.lic:/home/pactflow-onprem.lic \
  quay.io/pactflow/enterprise:${TAG} \
  -c "ls /home/pact_broker_fork/db/migrations | grep \d | sort | tail -n 1 | cut -d '_' -f1"
```

Then, perform the rollback using the PactFlow image that belongs to the database version currently deployed.

```sh
TAG="<current version of PactFlow>"
docker run --rm \
  --volume $PWD/pactflow-onprem.lic:/home/pactflow-onprem.lic \
  --env PACTFLOW_DATABASE_URL="postgres://username:password@host:port/database" \
  --env PACTFLOW_DATABASE_MIGRATION_TARGET="<migration number to roll back to>" \
  --entrypoint db-migrate \
  quay.io/pactflow/enterprise:${TAG}
```

## Minor and patch version upgrades

Upgrades between any minor or patch versions with the same major versions do not need any migration path.

## Major version upgrades

For major version upgrades, please upgrade to the most recent patch version of the previous major version before upgrading to the next major version.

