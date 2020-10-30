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

The application's PostgreSQL SSL mode is set to `required` by default, which means it requires the connection to the database to be encrypted, but does not verify the server's certificate. See the documentation for the [PACTFLOW_DATABASE_SSLMODE](environment-variables/index#pactflow_database_sslmode) environment variable for more options. It is not recommended to use any option weaker than `required`.

## Schema migrations

The database schema migrations will be run automatically on start up. See the documentation on [Database migrations](upgrading/database-migrations) for more information.

### Migrating from OSS Pact Broker to Pactflow

If you have been hosting your own instance of the open source Pact Broker, you can point the new Pactflow On-Premises application at the same database, and the missing migrations will be applied.
