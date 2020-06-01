---
title: Database migrations
---

## Auto migration

Schema migrations are run automatically on start up, unless the [PACTFLOW_DATABASE_AUTO_MIGRATE](/docs/on-premises/environment-variables/#pactflow_database_auto_migrate) environment variable is set to `false`. Data migrations are also run automatically on start up, after the schema migrations, and ensure that any data inserted into the database by a previous version of the application are migrated. This allows you to perform no-downtime, rolling upgrades across your cluster, ensuring any data inserted into latest database schema by the nodes running the previous version of the application are safely migrated.

## Manual migration

The migrations can be run manually against the database before upgrading the Pactflow Docker image if desired (however, this is generally not necessary).

```sh
docker run --rm \
  --env PACTFLOW_DATABASE_URL="postgres://username:password@host:port/database" \
  --entrypoint db-migrate \
  pactflow-onprem:latest
```

## Rollback

To perform a manual rollback:

```sh
docker run --rm \
  --env PACTFLOW_DATABASE_URL="postgres://username:password@host:port/database" \
  --env PACTFLOW_DATABASE_MIGRATION_TARGET="<migration number to roll back to>" \
  --entrypoint db-migrate \
  pactflow-onprem:latest
```

## Minor and patch version upgrades

Upgrades between any minor or patch versions with the same major versions do not need any migration path.

## Major version upgrades

For major version upgrades, please upgrade to the most recent patch version of the previous major version before upgrading to the next major version.

