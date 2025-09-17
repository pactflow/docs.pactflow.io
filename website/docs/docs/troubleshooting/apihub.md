---
title: API Hub Migration Guide
---

This guide helps you transition from PactFlow standalone to your API Hub account.

## Frequently Asked Questions

### Authentication

All users must log in through **SmartBear ID**.

After migration, you may see a **Continue with SmartBear ID** button, or you may be redirected directly to authenticate with SmartBear ID.

> **Note:** All users must have a SmartBear ID to log in to SmartBear products.

The sections below explain login changes in more detail.

#### I was using a username and password

If you haven't already created a SmartBear ID:

- Select **Continue with SmartBear ID** and register a new account.
- Use the **same email** as your previous login.
- You’ll retain all existing permissions after login.

> If you register after migration, it should still work as expected.

#### I was logging in via my company’s SSO (e.g. Azure AD or Okta)

After migration:

- You may see a **Continue with SmartBear ID** button.
- When clicked, or if skipped, you'll be automatically redirected to your SSO provider.

#### I was using GitHub or Google login

GitHub and Google login is still supported, but the behavior has changed.

##### Previous behavior

- Available only to paid customers (Team and Enterprise).
- Domain (Google) and organization (GitHub) restrictions were supported.
- Users were auto-provisioned without explicit invites.

##### New behavior

- Available to **all plans**.
- A new provider, **Microsoft**, will be supported.
- **Users must be manually invited**. The email must match exactly.
- **Domain/org restrictions are no longer supported** (feature deprecated).

> Existing users are not affected—they do not require re-inviting.

---

## Plan Details

### Will I be paying more?

No. You will be migrated to an API Hub plan at **the same price** you currently pay, with additional features included.

### What features should I expect?

#### PactFlow Enterprise Customers

- Migrated to **API Hub for Contract Testing (Enterprise)** plan.
- Receive **Team-level** entitlements for Design, Test, Explore, and Portal features.

#### PactFlow eCommerce Customers

- Migrated to **API Hub for Contract Testing (Team)** plan.
- Receive **Individual-level** entitlements for the other API Hub features.

---

## Deprecated Features and Breaking Changes

### API and Terraform Client

- Updates to Google/GitHub login settings will no longer take effect.
- `disable user` has been deprecated. The `active` field is ignored, but Terraform usage remains compatible.
- `Invite User API` is not supported for API Hub accounts.

---

## New Features

### New Login URL

You can now log in using:

```
https://app.pactflow.io
```

- This new URL is a central entry point for all users.
- After login, users are either:
  - Directed to their default tenant, or
  - Presented with a list of organisations they belong to.

> Your existing tenant-specific URL (for example, `xyz.pactflow.io`) will continue to work.

### Website and Marketing Collateral

- Update all links to use the new URL above.
- The phrase “PactFlow Contract Testing Platform” can be removed from external collateral.
- A **Login** button can be added to your homepage.

---

## User and Org Management

- Managing users is no longer done within the PactFlow UI.
- All user management is now performed in the [SmartBear Admin Portal](https://support.smartbear.com/api-hub/docs/en/api-hub-administration-management/adding-and-managing-users.html#adding-and-managing-users).

![SmartBear Admin](/ui/apihub/migration-smartbear-admin.png)

---

## API Hub Product Switching

Some UI updates are included as part of the transition:

- New **product switcher** experience.
- Updated branding and navigation reflecting **API Hub** instead of PactFlow.

![Product Switcher](/ui/apihub/migration-product-switcher.png)
