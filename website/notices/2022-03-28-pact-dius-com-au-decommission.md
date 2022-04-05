---
slug: 2022-03-28-pact-dius-com-au-decommission
title: Decommission notice for pact.dius.com.au
tags: [decommission]
---

On Monday 2nd May at 01:00 UTC we will be decommissioning the legacy domain name pact.dius.com.au. We don't expect any outage for the Pactflow application.

:::caution ACTION REQUIRED
If you currently use a domain name ending in `pact.dius.com.au` when accessing Pactflow (via the UI, API or Pact client tooling), you need to update the hostname you use to connect to our services to the pactflow.io domain immediately to avoid losing access to your service.
:::

To assist with migrating, you can use both domain names at the same time so that you can gradually cut over your systems to the new domain.

Customers who created accounts on or after July 30 2020 will automatically be using the new domain.

## Example

If your Pactflow hostname is currently `acme.pact.dius.com.au`, you will simply need to change it to to `acme.pactflow.io`. You can do this immediately without impact to your service - there is no need to wait until the cutoff date.

If you have any concerns over this change, please contact [support](mailto:support@pactflow.io).
