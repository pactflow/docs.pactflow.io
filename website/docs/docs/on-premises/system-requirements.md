---
title: System requirements
---

## Application server instance

### OS

Linux

### Minimum CPU/Memory

4.0 GiB Memory, 2 vCPUs

### Disk space usage

4.0 GiB

## Postgres database instance

### HA Configuration

### Configuration

We would recommend running Postgres as an Active/Passive setup with [streaming replication](https://wiki.postgresql.org/wiki/Replication,_Clustering,_and_Connection_Pooling), or Active/Active setup for the best availability.

For reference, pactflow.io runs on AWS RDS in [active/passive mode across multiple logical networks](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html), and fails over to the replica when in a failure mode.

### Minimum CPU/Memory

4.0 GiB Memory, 2 vCPUs

### Storage

5GiB (minimum)

## Load Balancing

We recommend running Pactflow on load-balanced infrastructure in at least a 2 node setup to enable high availability and greater throughput.

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
