---
id: migrating
title: Migrating from Pact Broker
---

# Migrating from Pact Broker

If you have previously used the open source Pact Broker with a PostgreSQL database it is possible to migrate that data to PactFlow, keeping everything and making it available in PactFlow. The migration process uses the existing Pact Broker database. Database migrations are then performed to add additional tables and data used for PactFlow features.

:::note
Migration is only supported for a Pact Broker running a PostgreSQL database.
:::

## Single Pact Broker instance

Follow existing [set up documentation](/docs/on-premises-2x) for setting up your new PactFlow. When you reach the section regarding setting up a [Database](/docs/on-premises-2x/database) follow these steps to migrate instead of creating a new database:

1. Re-use your existing Pact Broker environment variables, updating the names to read `PACTFLOW_*` instead of `PACT_BROKER_*`. A full list of the PactFlow environment variables can be found [here](/docs/on-premises-2x/environment-variables).

:::tip

It is crucial that all `PACT_BROKER_DATABASE_*` environment variables are renamed to `PACTFLOW_DATABASE_*` while their `values` remain the same. This is because your existing Pact Broker database will be used, and updated for use with PactFlow as part of the process.
:::

2. If you previously set the environment variables `PACT_BROKER_AUTO_MIGRATE_DB` and `PACT_BROKER_AUTO_MIGRATE_DB_DATA` remove these and replace them with a new environment variable named `PACTFLOW_DATABASE_AUTO_MIGRATE`. Set its value to `true`. This environment variable will allow your existing database to be updated with the required structures and data to support PactFlow, and maintain any existing data.  
You do not need to add the new variable if you did not previously set `PACT_BROKER_AUTO_MIGRATE_DB` and `PACT_BROKER_AUTO_MIGRATE_DB_DATA`.

4. When the PactFlow instance starts up the migrations will run automatically. The migrations can be run manually instead if needed. See details [here](/docs/on-premises-2x/upgrading/database-migrations)

## Multiple Pact Broker instances

It is not currently possible to combine multiple Pact Broker databases into a single database for use with PactFlow. Instead one Pact Broker database can be used in the migration, and the others ran in parallel with the new PactFlow instance until sufficient data is transferred. The PactFlow instance must contain all production versions of all services used in the contract test before it can safely take over all 'can-i-deploy' checks.

The recommended steps are as follows:

1. Select one of the Pact Broker databases to update and use going forwards.
2. Follow instructions above to set up PactFlow using this database.
3. The Pact Broker instances that was used in the upgrade process and be decommissioned, as the database and its contents are now available in PactFlow.
4. Run the PactFlow instance and any other existing Pact Broker instances in parallel. Duplicate the pact publication and pact verification tasks in your pipeline. The duplicated task should use the new PactFlow instance details. In this way all new data can gradually added to PactFlow while ensuring `can-i-deploy` still has access to production versions of all services.
5. Continue to run PactFlow and Pact Brokers in parallel. Once the PactFlow instance contains all the `production` versions for all the services used in the contract tests the old Pact Broker instances can be safely decommissioned. This will allow PactFlow to be the sole source of data for 'can-i-deploy'
6. Clean up any code and API calls that were used to run PactFlow and existing Pact Brokers in parallel. The pact publication and pact verification steps in your pipeline that used the old Pact Brokers can be removed.
