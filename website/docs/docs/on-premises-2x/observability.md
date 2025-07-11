---
title: Observability
---

# Observability

**Supported versions:** From v2.1.0

## Introduction

PactFlow supports native [OpenTelemetry](https://opentelemetry.io/) (OTel) instrumentation to help you monitor and troubleshoot your on-premise instance. By enabling telemetry, you can gain real-time visibility into application behavior, performance bottlenecks, and system health — using your existing observability tools.

Telemetry includes key operational events, HTTP metrics, error traces, and performance signals from core PactFlow services. When reporting issues to SmartBear, we recommend attaching relevant trace data to your support tickets to assist in diagnosing complex problems.

## Benefits

- **Proactive monitoring** – Detect issues before they impact users.
- **Faster debugging** – Trace request paths and performance regressions across services.
- **Custom alerting** – Integrate with your preferred observability stack to trigger alerts on thresholds or anomalies.
- **Open standard** – Use any OpenTelemetry-compatible platform; no vendor lock-in.
- **Support-ready diagnostics** – Improve turnaround time on support cases by sharing actionable telemetry traces.

## Configuration

To enable OpenTelemetry:

1. Set the following environment variables in your deployment configuration:

   - `OTEL_EXPORTER_OTLP_ENDPOINT` – The OTLP (HTTP) endpoint to export spans to.  
     _Example:_ `https://172.23.92.124:4318`

   - `OTEL_DEPLOYMENT_ENVIRONMENT` – The name of the deployment environment (for example, `production`).  
     _Default:_ `dev`

   - `OTEL_LOG_LEVEL` – Log level for the OpenTelemetry SDK instrumentation (`debug`, `info`, etc.).  
     _Default:_ `info`

2. Restart the application for changes to take effect.

For a complete list of configuration options, see the [Application Configuration Guide](/docs/on-premises-2x/environment-variables).


## Trace information

Once enabled, PactFlow emits telemetry for:

- HTTP request durations, routes, and status codes
- Internal service interactions (e.g., contract publication, verification events)
- SQL queries within the application
- Trace IDs (`x-request-id`) to support distributed correlation
- Error traces and response codes when applicable

Traces adheres to [semantic conventions](https://opentelemetry.io/docs/specs/semconv/) where a standard exists (such as HTTP, database).

PactFlow supports trace propagation using `traceparent`, `tracestate`, and `x-request-id` headers. This allows upstream gateways or load balancers to influence sampling decisions and maintain consistent distributed tracing across systems.

> **Note:** OpenTelemetry instrumentation currently applies only to API requests. Tracing does not include browser-rendered UI interactions or background jobs such as webhook executions or bi-directional contract comparisons.

## Security & error handling

- All sensitive fields (tokens, secrets, credentials) are excluded or redacted from trace payloads.
- No personally identifiable information (PII) or authorization headers are ever emitted.
- Telemetry failures (e.g., network errors) will not interrupt application flow — trace data is emitted on a best-effort basis.
- If misconfigured, PactFlow falls back to a no-op exporter with internal logging only.

## Application behavior

PactFlow is designed to handle telemetry configuration safely and transparently. Here's what to expect under different deployment conditions:

### 1. OpenTelemetry is enabled and correctly configured

- Traces will be emitted to the specified OTLP over HTTP endpoint.
- Traces will appear in your observability platform if routing is successful.
- Internal operations (HTTP, database, background jobs) will be captured as spans.

### 2. OpenTelemetry is enabled but misconfigured

- No traces are sent to the collector.
- You will see logs from the OpenTelemetry SDK indicating misconfiguration or export errors.
- Application behavior is unaffected — telemetry failures are non-blocking.
- PactFlow silently falls back to a no-op exporter while logging internal telemetry errors.

### 3. OpenTelemetry is not configured

- No traces will be emitted.
- PactFlow continues to operate with no changes to behavior or performance.
- No warnings or logs are generated related to OpenTelemetry.

This ensures OpenTelemetry is always safe to enable and won't interfere with core application operations.

## Supported systems

PactFlow's telemetry is based on the OpenTelemetry specification and can be exported to any compliant observability backend.

### Supported exporters

- **OTLP over HTTP only**
- **Unauthenticated endpoints only** (e.g., local sidecars or internal collectors)

> Authentication headers are not currently supported.

Compatible with:

- **Bugsnag**
- **Datadog**
- **Dynatrace**
- Any OpenTelemetry-compliant backend

### Supported versions

- PactFlow supports OpenTelemetry [v1.21+](https://github.com/open-telemetry/opentelemetry-specification/releases), adhering to [semantic conventions](https://opentelemetry.io/docs/specs/semconv/) for HTTP, database, and background tasks.
