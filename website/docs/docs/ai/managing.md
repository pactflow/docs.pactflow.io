---
title: Managing PactFlow AI
sidebar_label: Managing PactFlow AI
---

## Usage Limits

Access to the feature is limited by a credit system, where each test generated uses 1 credit. Usage is metered based on the number of tests generated per calendar month, and resets on the first day of each month.

Credits are allotted to your account based on your plan:

1. PactFlow developer plans: 10 credits per month (total) 
2. Enterprise Plus or plans with Contract Testing Pro Addon: 30 credits per purchased user per month
3. All other plans (Individual, Team and Enterprise Plans): 10 credits per month

Note that credits are allocated to the organization, not individual users.

### Examples

1. **Starter (Developer) Plan**

    If you have a free PactFlow plan, you are entitled to 10 tests per month no matter how many active users there are. 
    *NOTE: this is a legacy plan and is no longer available for signups.*

2. **Team Plan**

    If you are on a Team 10 Plan (5 active users), you receive for 10 credits x 10 users for a total of 100 credits.

3. **Enterprise Plan**

    If you are on an Enterprise Plan with 50 users (42 active users), you receive for 30 credits x 50 users for a total of 1500 credits.

### Consumption

Each successfully generated test consumes a credit. If your organization reaches its limit, you will see the following error:

```
ERROR: Client error: 403 Forbidden AI credits are exhausted.
```

:::note
The limits and your usage against these limits are not currently visible on the subscription page. They may be checked using the `pactflow-ai status` command.
:::


## Role Based Access Control (RBAC)

In addition to the [system preference](#managing-the-feature) that enables AI within your workspace, PactFlow's RBAC model allows you to manage access to specific AI capabilities for your users. For detailed information, refer to the [permissions documentation](/docs/permissions#ai).

By default, users assigned the [User](/docs/permissions/predefined-roles#user) role have access to all AI permissions ([`ai:*`](/docs/permissions#ai)), unless:

- Your account was created prior to the release of the AI feature (September 2024), or
- You have customized your role configuration.

**Granting Access:**

To enable AI access for users, ensure that the assigned role includes either the [`ai:*`](/docs/permissions#ai) permission (granting access to all AI features) or the specific permissions required for the desired functionality. Once granted, access may be checked using the `pactflow-ai status` command.

## Configuring PactFlow AI

### Managing the Feature

Access to PactFlow AI can be managed by a PactFlow Administrator (or user with the [`system_preference:manage:*`](/docs/permissions#system_preferencemanage) permission):

1. In the UI, navigate to "Settings" -> "Preferences" -> "System Preferences".
2. Check the "AI Test Generation" checkbox.
3. Save the settings.

### Configuring the CLI

The PactFlow AI CLI supports flexible configuration through environment variables and configuration files. It allows both **user-level** and **local** configuration, with local settings taking precedence.

### Configuration Methods

#### 1. Environment Variables
The CLI automatically picks up configuration from environment variables. For example, to configure authentication, set the following:

```sh
export PACT_BROKER_BASE_URL="https://YOUR_WORKSPACE.pactflow.io"
export PACT_BROKER_TOKEN="YOUR_TOKEN"
```

#### 2. Local Configuration File
To store configuration at the project level, use:

```sh
pactflow-ai config set broker.base-url https://YOUR_WORKSPACE.pactflow.io
pactflow-ai config set broker.auth.token YOUR_TOKEN
```

This creates a `.pact.toml` file in the project directory. Add this file to `.gitignore` to avoid committing sensitive data.

**Recommended setup**

1. Commit `.pact.toml` with shared configuration options for your team.
1. Set sensitive user-level data (such as your API token) through environment variables or the user config (see below).

The CLI will automatically combine the options.

#### 3. User Configuration File
For global configuration shared across multiple projects, use:

```sh
pactflow-ai config set --user broker.base-url https://YOUR_WORKSPACE.pactflow.io
pactflow-ai config set --user broker.auth.token YOUR_TOKEN
```

This stores the configuration in `~/.config/pact/config.toml` (Unix/macOS) or `%APPDATA%\pact\config.toml` (Windows). On unix-like systems, it will also respect the `XDG_CONFIG_HOME` environment variable.

### Managing Configuration

You can inspect or modify settings with the following commands:

- **List all settings**: `pactflow-ai config list`
- **Retrieve a setting**: `pactflow-ai config get broker.base-url`
- **Override with an explicit file**: Use `--config-file <path>`

For advanced options, including certificate management for corporate environments, refer to:

```sh
pactflow-ai config --help
```
<!-- 
## Monitoring Usage

### Monitoring Usage via the UI

TBC

[screenshot]

### Monitoring Usage via the API

TBC

[Link to API](https://smartbear.portal.swaggerhub.com/pactflow/default/pactflow_saas_api#/metric/get_metrics) -->
