---
title: Logging
---

## Output

Pactflow application logs are sent to the standard output stream of the Docker container, with the expectation that the container orchestration service will collect and forward them to a log aggregation service.

## Format

The default log format is JSON. This can be changed by setting the [PACTFLOW_LOG_FORMAT](environment-variables#pactflow_log_format) environment variable.

## Level

The default log level is `INFO`. This can be changed by setting the [PACTFLOW_LOG_LEVEL](environment-variables#pactflow_log_level) environment variable.
