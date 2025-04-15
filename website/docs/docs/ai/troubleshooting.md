---
title: Troubleshooting
sidebar_label: Troubleshooting
---

## Errors

### "Forbidden Insufficient permissions"

If you encounter the following error:

```
ERROR: Client error: 403 Forbidden Insufficient permissions {"missing_permissions":["ai:generation:code"]}
```

This indicates that the user does not have the required permissions to access the feature.

**Resolution:**

Ensure the necessary AI [permission](/docs/permissions#ai) is assigned to the user's role. In this example, the `ai:generation:code` permission is required. For more details, refer to the [permissions](/docs/permissions#ai) documentation.

### "AI disabled in system preferences"

If the error message states that "AI disabled in system preferences", this means the AI feature has not been enabled for your account.

**Resolution:**
Enable the AI feature by following the steps outlined [above](#enabling-the-feature).

### "AI credits are exhausted"

If you encounter the following error:
```
ERROR: Client error: 403 Forbidden AI credits are exhausted.
```

This indicates that you have exceeded the AI credits on the account and can no longer use any AI features. 

**Resolution:**
Upgrade your plan to increase your credit allocation, or wait until the credits reset after 30 days. For more details on usage limits, see the [documentation](#usage-limits).

### "AI is not enabled for this plan"

If the error message states that "AI features are not enabled on this plan", your plan does not include AI features as part of its entitlements.

**Resolution:**
Upgrade to a plan that has AI enabled.

## Getting help and providing feedback

For feedback, feature requests, or assistance with the tool, join our [slack channel](https://pact-foundation.slack.com/archives/C07K2FT0XKK) or speak directly with your Account Manager. For general support, please follow the [usual methods](https://support.smartbear.com/pactflow/message/).