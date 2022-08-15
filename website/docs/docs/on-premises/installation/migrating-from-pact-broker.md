---
id: migrating
title: Migrating from Pact Broker
---

# Migrating from Pact Broker

It is possible to migrate from using the open source Pact Broker to Pactflow, keeping all existing data and making it available in Pactflow. The migration process uses the existing Pact Broker database, database migrations are then performed to add additional tables and data used for Pactflow features.

If there is no existing Pact Broker instance continue to the [Database](https://docs.pactflow.io/docs/on-premises/database) section.

## Single Pact Broker instance

Follow existing [set up documentation](https://docs.pactflow.io/docs/on-premises) for setting up your new Pactflow, until the section titled ['Database'](https://docs.pactflow.io/docs/on-premises/database).

To migrate your existing Pact Broker follow these steps instead of creating a new database:

1. Re-use your existing Pact Broker environment variables, updating the names to read `PACTFLOW_` instead of `PACT_BROKER_`. It is crucial that the values for `DATABASE` related environment variables remain the same so that your Pact Broker database will be updated and used. A full list of the Pactflow environment variables can be found [here](https://docs.pactflow.io/docs/on-premises/environment-variables).
2. Remove the environment variables called `PACT_BROKER_AUTO_MIGRATE_DB` and `PACT_BROKER_AUTO_MIGRATE_DB_DATA`
3. Add a new environment variable to replace these called `PACTFLOW_DATABASE_AUTO_MIGRATE`, set its value to `true`. This environment variable will allow your existing database to be updated with the required structures and data to support Pactflow, and maintain any existing data.
4. When the Pactflow instance starts up the migrations will run automatically. The migrations can be run manually instead if needed. See details [here](https://docs.pactflow.io/docs/on-premises/upgrading/database-migrations)

## Multiple Pact Broker instances

It is not currently possible to combine multiple Pact Broker databases into a single database for use with Pactflow. Instead one Pact Broker database can be used in the migration, and the others ran in parallel with the new Pactflow instance until sufficient data is transferred. The Pactflow instance must contain all production versions of all services used in the contract test before it can safely take over all 'can-i-deploy' checks.

The recommended steps are as follows:

1. Select one of the Pact Broker databases to update and use going forwards.
2. Follow instructions above to set up Pactflow using this database.
3. The Pact Broker instances that was used in the upgrade process and be decommissioned, as the database and it's contents are now available in Pactflow.
4. Run the Pactflow instance and any other existing Pact Broker instances in parallel. You will need to update API calls such as publishing pacts and checking can-i-deploy to utilise both Pactflow and the old Pact Brokers. In this way all new data can gradually added to Pactflow while ensuring `can-i-deploy` still has access to production versions of all services.
5. Continue to run Pactflow and Pact Brokers in parallel. Once the Pactflow instance contains all the `production` versions for all the services used in the contract tests the old Pact Broker instances can be safely decommissioned. This will allow Pactflow to be the soul source of data for 'can-i-deploy'
6. Clean up any code and API calls that were used to run Pactflow and existing Pact Brokers in parallel.
