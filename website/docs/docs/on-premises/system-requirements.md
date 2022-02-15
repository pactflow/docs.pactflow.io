---
title: System requirements
---

## Application server instance

### OS

Linux

### Minimum CPU/Memory

4.0 GiB Memory, 4 vCPUs

### Disk space usage

4.0 GiB

### Docker version

20.10.0 or later

## Postgres database instance

### HA Configuration

### Configuration

We would recommend running Postgres as an Active/Passive setup with [streaming replication](https://wiki.postgresql.org/wiki/Replication,_Clustering,_and_Connection_Pooling), or Active/Active setup for the best availability.

For reference, pactflow.io runs on AWS RDS in [active/passive mode across multiple logical networks](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html), and fails over to the replica when in a failure mode.

### Minimum CPU/Memory

4.0 GiB Memory, 4 vCPUs

### Storage

5GiB (minimum)
25GiB (recommended)

### I/O Performance

* 10 read/s
* 25 write/s

## Load Balancing

We recommend running Pactflow on load-balanced infrastructure in at least a 2 node setup to enable high availability and greater throughput. So for clarity, we would recommend running two servers both with 4GiB memory and 4 CPUs for a total capacity of 8GiB Memory and 8 CPUs.

The Pactflow application is stateless, and therefore sticky sessions do not need to be configured. Use round-robin or least outstanding requests to route to the application servers.

_NOTE_: Most Pact tooling has retries built-in to handle minor outages communicating to a broker.

## Scaling and Monitoring

Below are the key scaling considerations.

First, make sure you've identified the baseline load and have performed a [load test](installation/load-testing). This will help you to set you boundaries for your scale out and scale in parameters.

Pactflow is a database intensive application, with the I/O performance of the database being the most critical factor in determining overall system performance. You should setup monitoring for the following metrics:

* CPU
* Memory
* I/O latency
* Query latency
* Remaining storage space

Application servers tend to be more CPU bound, but you should look to monitor and scale at least:

* CPU
* Memory


## Benchmarking and Forecasting

The usage patterns of every customer is different. For example, we have several customers who are among top users of our SaaS platform with less than 30 integrations.

Things that will affect how the system scales include:

* Concurrent usage i.e. requests per second (usually by automation systems such as CI/CD)
* CI implementation patterns (e.g. integrations to Pactflow, the use of polling vs webhooks)
* Developer habits (continuous check-in vs bigger commits) causing more or less builds
* Whether you run regular database cleanups (to reduce database storage requirements, and speed up queries)
* The size, variation and stability of contracts
* The interconnectedness of your system
* Database growth

and so on. These types of data are very hard to collect, measure and predict.

For forecasting purposes we've created a standard model you can use for projecting storage and compute costs as you grow, which is based on the number of active users<sup>*</sup> you have on the system.

_NOTE_: We still recommend using the monitoring and scaling approach (defined above) to automatically scale up/down your system as required.

_<sup>*</sup> Active users is defined as a developer that either logs into Pactflow daily or commits code that would trigger a CI build that integrates with Pactflow_
### Standard Units

* 1 `compute unit`  = 1 CPU, 256 MiB memory
* 1 `database unit` = 1 CPU, 256 MiB memory, 1 GiB storage (per week), 25 writes/s, 10 read/s

For each 500 active users<sup>*</sup>, you should increment your total compute capacity by one (1) unit, and _each_ database server capacity by one (1) unit.


### Examples

_**Scenario 1**: 1000 users in year 1_

Assuming our database uses active/passive mode and replication.

Baseline capacity should be 2 x Application Servers each with 4 CPU and 4GiB memory, and a two Postgres database instances (one for the active and passive) each with 4CPU, 4GiB memory, 25GiB volume and 25/10 write/read per second.

To calculate the number of standard units you need to add:

```
new units = expected users / 500
          = 1000 / 500
          = 2 units
```

You should therefore add 2 CPUs and 512 MiB to your total compute budget, and add 2 CPUs, 512 MiB of memory and 104 GiB storage capacity to each of your database instances in year 1, for a total budget:

* **Compute**: 10 CPU, 8.5 GiB RAM (measured by total resources and not physical instances)
* **Database**: 2 x database servers each with 6 CPU, 4.5 GiB RAM, 75 writes/s, 30 read/s, 129 GiB storage

_**Scenario 2**: Additional 1300 users in year 2_

```
new units = expected users / 500
          = 1300 / 500
          = 3 units (rounded)
```
You should therefore add 3 CPUs and 768 MiB to your total compute budget, and add 3 CPUs, 768 MiB of memory and 156 GiB storage capacity to each of your database instances in year 2, for a total budget:

* **Compute**: 13 CPU, 9.25 GiB RAM (measured by total resources and not physical instances)
* **Database**: 2 x database servers each with 9 CPU, 5.25 GiB RAM, 150 writes/s, 60 read/s, 285 GiB storage