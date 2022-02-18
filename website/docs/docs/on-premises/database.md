---
title: Database
---

A PostgreSQL database is required for storage of the application data.

## Supported versions

PostgreSQL version 10.6 and later are supported.

## Database creation

Log in as your database administrator, and execute the following statements in an SQL session.

```sql
CREATE USER pactflow_user WITH PASSWORD '<password>';
CREATE DATABASE pactflow;
GRANT ALL PRIVILEGES ON DATABASE pactflow TO pactflow_user;
REVOKE ALL ON DATABASE pactflow FROM PUBLIC;
```

## SSL

The application's PostgreSQL SSL mode is set to `require` by default, which means it requires the connection to the database to be encrypted, but does not verify the server's certificate. See the documentation for the [PACTFLOW_DATABASE_SSLMODE](environment-variables#pactflow_database_sslmode) environment variable for more options. It is not recommended to use any option weaker than `require`.

## Authentication

## Username/password authentication

Database access between the Pactflow application and Postgres instance can be secured using a [username](/docs/on-premises/environment-variables#pactflow_database_username) and [password](/docs/on-premises/environment-variables#pactflow_database_password), configured via environment variables.

## AWS IAM authentication

When deploying Pactflow on AWS Cloud infrastructure, database access between the Pactflow application and RDS instance can be secured using IAM. Please see the [AWS RDS IAM documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAM.html) for more information.

The following environmet variables must be set for the Pactflow application:

* [`PACTFLOW_DATABASE_ADAPTER="postgresiam"`](/docs/on-premises/environment-variables#pactflow_database_adapter)
* [`PACTFLOW_DATABASE_USERNAME`](/docs/on-premises/environment-variables#pactflow_database_username)
* [`PACTFLOW_DATABASE_HOST`](/docs/on-premises/environment-variables#pactflow_database_host)
* [`PACTFLOW_DATABASE_PORT`](/docs/on-premises/environment-variables#pactflow_database_port)
* [`PACTFLOW_DATABASE_NAME`](/docs/on-premises/environment-variables#pactflow_database_name)
* [`PACTFLOW_DATABASE_SSLMODE="require"`](/docs/on-premises/environment-variables#pactflow_database_sslmode)
* [`AWS_REGION`](/docs/on-premises/environment-variables#aws_region)

## Schema migrations

The database schema migrations will be run automatically on start up. See the documentation on [Database migrations](upgrading/database-migrations) for more information.

### Migrating from OSS Pact Broker to Pactflow

If you have been hosting your own instance of the open source Pact Broker, you can point the new Pactflow On-Premises application at the same database, and the missing migrations will be applied.

## Schema

![Database schema](/on-premises/schema.png)
