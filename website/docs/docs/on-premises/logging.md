---
title: Logging
---

## Output

PactFlow application logs are sent to the standard output stream of the Docker container, with the expectation that the container orchestration service will collect and forward them to a log aggregation service. Both the UI and App logs will be interspersed here. They are distinguishable by the `application` property. UI will be `pactflow-ui` and API will be `pactflow-application`.

## Format

The log format is JSON.

## Level

The default log level is `INFO`. This can be changed by setting the [PACTFLOW_LOG_LEVEL](environment-variables#pactflow_log_level) environment variable.
