---
title: PactFlow AI
sidebar_label: AI ⚡️
---

import { AiDownloadTable } from "../../../src/components/index";

:::note
The PactFlow AI features are currently available through an open beta program. During this stage, all customers can explore the capabilities within fixed usage limits ([more info](#limits)).
:::

PactFlow's Test Generation feature is an AI-powered tool designed to help users quickly generate Pact tests. By providing access to source code, OpenAPI documents, or traffic capture data, it reduces the time and effort needed to create and maintain contract tests.

## Enabling the feature

This feature is disabled by default on all organisations. To enable the feature:

1. In the UI, navigate to "Settings" -> "Preferences" -> "System Preferences".
2. Check the "Test Generation" checkbox.
3. Save the settings.

:::note
This setting is only available in the new user interface.
:::

## Installation

For *nix users (including Windows users running WSL), use the following command to download and install:

```
curl https://download.pactflow.io/ai/get.sh  | sh
```

Verify the installation by running `pactflow-ai` to ensure it executes successfully.

### Manual installation

Alternatively, download the latest version for your OS and architecture from the table below. Be sure to add it to your environment's `PATH`:

<AiDownloadTable />

## Usage

Running `pactflow-ai --help` will show detailed usage for any subcommands.

### Authentication

Authentication requires valid PactFlow API Tokens, which can be obtained from the `Settings > Tokens` [page](/docs/user-interface/settings/api-tokens) of your PactFlow organisation.

You can authenticate with the CLI in several ways:

#### Environment Variables

Set the following environment variables, and the CLI will use them to communicate with PactFlow:

```
export PACT_BROKER_BASE_URL="https://YOUR_ORG.pactflow.io"
export PACT_BROKER_TOKEN="YOUR_TOKEN"
```

#### Local configuration file

Configure the CLI using the following commands:

```
pactflow-ai config set broker.base-url https://YOUR_ORG.pactflow.io
pactflow-ai config set broker.auth.token YOUR_TOKEN
```

This creates a `.pact.toml` file, which should be added to your `.gitignore`.

#### User configuration file

Alternatively, store the user configuration file in `~/.config/pact/config.toml` (Unix and macOS), and `%APPDATA%\pact\config.toml` (Windows).

Pass the `--user` flag when running `pactflow-ai config set` to write to this file automatically.

## Usage Limits

Access to the feature is metered based on the number of tests generated in a 30-day rolling window. Credits are allocated as follows:

1. Starter Plans: 10 credits per month
2. All other plans: 10 credits per purchased user per month

Credits are allocated to the organisation, not individual users.

### Examples

1. **Starter Plan**

If you have a free plan (20 active users), you are only entitled to 10 tests per month.

**2. Team Plan**

If you are on a Team 10 Plan with 5 active users, you are eligible for 10 credits x 10 users = 100 credits total.

**2. Enterprise Plan**

If you are on an Enterprise Plan with 50 users (42 active), you are eligible for 10 credits x 50 users = 500 credits total.

### Consumption

Each successfully generated test consumes a credit. If your organisation reaches its limit, you will see the following error:

```
ERROR: Client error: 403 Forbidden AI credits are exhausted.
```

:::note
The limits and your usage against these limits are not currently visible on the subscription page. This will be added in due course.
:::

## Getting help and providing feedback

For feedback, feature requests, or assistance with the tool, join our [slack channel](https://pact-foundation.slack.com/archives/C07K2FT0XKK) or speak directly with your Account Manager. For general support, please follow the [usual methods](https://support.smartbear.com/pactflow/message/).