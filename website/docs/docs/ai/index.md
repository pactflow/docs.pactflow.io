---
title: PactFlow AI
sidebar_label: AI
---

import { AiDownloadTable } from "../../../src/components/index";

:::note
The PactFlow AI feature is currently in closed beta and is available only to select customers who have joined the [waitlist](https://pactflow.io/ai/). If you’re interested in participating, please [register here](https://pactflow.io/ai/).
:::

## Prerequisites

1. A PactFlow cloud account (you can create a [free account here](https://pactflow.io/try-for-free/))
2. AI feature enabled on your account by SmartBear

## Installation

For *nix users (including Windows users running WSL), use the following command to download and install:

```
curl https://download.pactflow.io/ai/get.sh  | sh
```

Verify the installation by running `pactflow-ai` to ensure it executes successfully.

### Manual installation

Alternatively, download the latest version for your operating system and architecture from the table below. Remember to add it to your environment's `PATH`:

<AiDownloadTable />

## Usage

Running `pactflow-ai --help` will give you the detailed usage for any of the subcommands.

### Authentication

Authentication requires valid PactFlow API Tokens, which can be obtained from the `Settings > Tokens` [page](/docs/user-interface/settings/api-tokens) of your PactFlow account.

There are several ways to authenticate with the CLI:

#### Environment Variables

Export the following environment variables, and the CLI will use these credentials to communicate with PactFlow:

```
export PACT_BROKER_BASE_URL="https://YOUR_ACCOUNT.pactflow.io"
export PACT_BROKER_TOKEN="YOUR_TOKEN"
```

#### Local configuration file

You can also configure the CLI using the following commands:

```
pactflow-ai config set url https://YOUR_ACCOUNT.pactflow.io
pactflow-ai config set token YOUR_TOKEN
```

This will create a `.pactflow.toml` file, which should be added to your `.gitignore`.

#### User configuration file

Alternatively, the user configuration file can be stored in a configuration directory for PactFlow. The paths are `~/.config/pactflow/config.toml` on Unix, and `%APPDATA%\pactflow\config.toml` on Windows.

## Getting help and providing feedback

For feedback, feature requests, or assistance with the tool, please contact the email address provided when you were granted access. For support unrelated to the AI feature, please follow the [usual methods](https://support.smartbear.com/pactflow/message/).