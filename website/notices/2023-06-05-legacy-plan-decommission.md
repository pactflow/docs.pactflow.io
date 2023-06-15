---
slug: 2023-06-05-legacy-plan-decommission
title: Decommission notice for legacy plans
tags: [decommission]
---

On Monday `17th July at 02:00 UTC` we will be decommissioning our legacy plans, migrating any customers on such plans to a Team plan with 5 users at no cost.

:::caution ACTION REQUIRED
If you are on a legacy PactFlow plan (see below), you are required to act to prevent interruption to your service.
:::

## Key Dates

* Plan migration date - `Monday 17th July 02:00 UTC`
* API Token migration date - `Monday 11th September 02:00 UTC`

All legacy accounts will be switched over to the new plans on `Monday 17th July 02:00 UTC` automatically, unless you contact us before hand to schedule it earlier. This is the “Plan migration date”.

To allow a smooth migration for automation setups, your basic auth API credentials will be removed several months later, on `Monday 11th September 02:00 UTC` at which point you must exclusively use [API Tokens](/docs/user-interface/settings/api-tokens) for all API access. This is the “API Token migration” date.

You can start to transition to API Tokens as soon as your account has been migrated to the new plans. API Tokens and your existing Basic Auth API access will both work until the cut off date.

## FAQ

### Question: How do I know if I’m on a legacy account?

If you have a PactFlow account that you access via the basic authentication scheme (for both UI and API access) then you are on one of our legacy plans and will be included in the migration.

That is, you have been issued both a read-only set of credentials and read-write set of credentials for shared use by your organisation.

Legacy plans were created before May 2019, and do not have access to several PactFlow [features](https://pactflow.io/features/), including the latest user interface - this is the most obvious difference if you are unsure. If your PactFlow account looks like https://test.pactflow.io/ (you may use the credentials `dXfltyFMgNOFZAxr8io9wJ37iUpY42M` / `O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1` to login) then you are on a legacy plan.

### Question: What do I need to do?

We will automatically migrate your account on the above date, unless you wish to migrate earlier (see below).

We need an email address and name for the initial administrator of your account, and we will then verify your contact information and work with you to ensure your account is setup correctly and the migration is as smooth as possible.

To allow a smooth migration for automation setups, your Basic Auth API credentials will be removed several months later, on Monday 11th September 02:00 UTC at which point you must exclusively use [API Tokens](/docs/user-interface/settings/api-tokens) for all API access.

You can start to transition to API Tokens as soon as your account has been migrated to the new plans. API Tokens and your existing Basic Auth API access will both work until the API Token Migration date.

### Question: Can I migrate earlier?

Yes, you can do this be [contacting us](https://support.smartbear.com/pactflow/message) with the title "Request for early migration from legacy PactFlow plan" and we will contact you to proactively set up the account.

### Question: What if I do nothing?

On the Plan migration date, the API will continue to work with the existing Basic Authentication Scheme. Any automations such as your CI/CD pipelines will continue to work. 

You will not be able to login via the UI, unless you are the default contact on your account and have received your new PactFlow credentials.

On the API Token migration date, all Basic Auth credentials will be disabled. Any users or tools using these credentials will cease to work.

If you have lost access, you will need to [contact us](https://support.smartbear.com/pactflow/message) with the title "Request for new administrator for our legacy PactFlow plan", to get a new administrator setup. 

### Question: What should I replace the basic auth credentials with?

For API access, you should create a new System Account and use the read-only or read-write API Tokens associated with the System Account. 

For UI access, you should invite any users onto your account. Account administrators can do both of these from the User Management page from within the application.

### Question: What plan will I be migrated to?

All legacy plans will be migrated to a Team plan, with a limit of 5 Users. 

### Question: What do I get with my new free Team plan?

You will be upgraded to a Team 5 plan *at no cost to you*. This is a modified version of the [Team plans](https://pactflow.io/pricing/) usually available for purchase on our website, with the only difference being the number of User licenses is restricted to 5. If you'd like to upgrade to a larger plan (to accommodate a larger number of users, or to gain access to the enterprise level features) as part of this process *at your own expense*, please [contact us](https://support.smartbear.com/pactflow/message) about your migration and we can work with you to do so.