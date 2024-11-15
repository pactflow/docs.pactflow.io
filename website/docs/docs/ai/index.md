---
title: Test Generation featuring HaloAI
sidebar_label: AI ⚡️
---

import { AiDownloadTable } from "../../../src/components/index";

:::note
PactFlow's Test Generation features are currently available through an open beta program. During this stage, all customers can explore the capabilities within fixed usage limits ([more info](#usage-limits)).

If you don’t already have a PactFlow account, get started with our [free Starter plan](https://pactflow.io/try-for-free?&utm_source=pactflow-docs&utm_content=ai).
:::

PactFlow's Test Generation feature, is an AI-powered capability designed to help users quickly generate Pact tests. By providing access to source code, OpenAPI descriptions, or traffic capture data, it reduces the time and effort needed to create and maintain contract tests.

## Enabling the feature

This feature is disabled by default on all organisations. To enable the feature:

1. In the UI, navigate to "Settings" -> "Preferences" -> "System Preferences".
2. Check the "Test Generation" checkbox.
3. Save the settings.

:::note
This setting is only available in the new user interface.
:::

## Installation

For *nix users (including Windows users running WSL/msys2/mingw), use the following command to download and install:

```sh
curl https://download.pactflow.io/ai/get.sh | sh
```

For Windows PowerShell users, use the following command to download and install:

```pwsh
Invoke-WebRequest -Uri "https://download.pactflow.io/ai/get.ps1" | Invoke-Expression
```

### Installation Options

There are some options which you can set during installation.

For a full list, see the `--help`/`-h` command

```sh
curl https://download.pactflow.io/ai/get.sh | sh -s -- -h
```

- `--verbose` / `-v` / `PACTFLOW_AI_VERBOSE`: Enable verbose output
- `--quiet` / `-q` / `PACTFLOW_AI_QUIET`: Disable progress output
- `--yes` / `-y` / `PACTFLOW_AI_YES`: Disable confirmation prompt and assume 'yes'
- `--destination` / `-d` / `PACTFLOW_AI_DESTINATION`: Specify the directory to install the binary
- `--default-host` / `PACTFLOW_AI_DEFAULT_HOST`: Choose a default host triple rather than autodetecting
- `--no-modify-path` / `PACTFLOW_AI_NO_MODIFY_PATH`: Don't configure the PATH environment variable

Verify the installation by running `pactflow-ai` to ensure it executes successfully.

### Manual installation

Alternatively, download the latest version for your OS and architecture from the table below. Be sure to add it to your environment's `PATH`:

<AiDownloadTable />

:::note
Linux GNU users will require glibc version 2.23 or later.

Environments which do not use glibc, or use a version of glibc prior to 2.23, should instead use the musl variant.
:::

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

    If you have a free plan, you are entitled to 10 tests per month no matter how many active users there are.

2. **Team Plan**

    If you are on a Team 10 Plan (5 active users), you receive for 10 credits x 10 users for a total of 100 credits.

3. **Enterprise Plan**

    If you are on an Enterprise Plan with 50 users (42 active users), you receive for 10 credits x 50 users for a total of 500 credits.

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

## Tutorials

We've created an [in-browser tutorial](https://docs.pactflow.io/docs/tutorials#getting-started-with-pactflow-ai) to help you get started with PactFlow's test generation feature.
