# Slow responses when fetching pacts for verification

Slow responses when fetching pacts for verification when [WIP pacts](https://docs.pact.io/wip) is enabled is caused by performance problems calculating the latest pact for each tag when large numbers of application versions exist. This problem does not exist when using branches instead of tags.

To speed up the response, we advise optimising your PactFlow database performance by using the following steps:

1. Use branches/deployments instead of tags

  a) Publish pacts and verifications with the "branch" property set rather than the "tag" property.

  b) Use branches instead of tags in the consumer version selectors in every provider verification configuration.

  c) Record deployments/releases for can-i-deploy rather than using tags.

2. Delete tags from database

##  1. Use branches/deployments instead of tags

### a) Publish pacts and verifications with the "branch" property set

See documentation [here](https://docs.pact.io/pact_broker/branches).

### b) Use branches instead of tags in the consumer version selectors

See documentation [here](https://docs.pact.io/provider/recommended_configuration).

### c) Record deployments/releases

See documentation [here](https://docs.pact.io/pact_broker/recording_deployments_and_releases).

## 2. Delete tags from database

Once there is no dependency on tags, they can be deleted.

For SaaS customers, please [raise a support ticket](https://support.smartbear.com/pactflow/message/) explaining that you would like your tags deleted, with a reference to this document.

For On-premises customers, please run the following SQL statement against the database:

```sql
delete from tags;
```
