# Disabling dangerous contract modification

## Background

When a contract is published, it is associated with the application version that generated the contract.

When the Pact Broker (the OSS project on which PactFlow is based) was first created, the contract content for an existing application version was allowed to be modified. When the `can-i-deploy` feature was released however, it became apparent that allowing modification of a contract for a particular consumer version was causing `can-i-deploy` to be unreliable. The result would depend on which branch had last published a contract.

To prevent this scenario without breaking pipelines that depended on contract modification, the PactFlow configuration setting `allow_dangerous_contract_modification` was introduced. All new SaaS accounts and new on-premises installations from August 2021 were configured to disallow contract modification for a given application version.

Contract modification is still allowed for accounts and installations created before August 2021, and this can cause problems when the versioning best practice guidelines are not followed. We strongly recommend that contract modification is disabled for all SaaS accounts and on-premises installations.

You may choose to disable contract modification and fix affected pipelines afterwards, or you may wish to identify which pipelines will be affected by the change, and fix them before making the change.

Please follow these instructions below to identify and prevent issues.

## How to identify if dangerous contract modifications are occurring

### Using the metrics endpoint (SaaS and On-Premesis)

* For On-Premises installations, ensure you have version 1.29.0 or later.
* Log in to your PactFlow account.
* Click on the API Browser button in the top right.
* In the `Explorer bar` append `/metrics` to the base URL, and click `Go!`
* In the `Properties` section, locate the object for the `pactRevisionsPerConsumerVersion` key.
* If the `distribution` object has only one key, and that key is "1", then no contracts have been modified.
  ```
  "pactRevisionsPerConsumerVersion": {
      "distribution": {
        "1": 916
      }
    },
  ```
* If there are multiple keys inside the `distribution` object, then contract modification is occurring.
  ```
  "pactRevisionsPerConsumerVersion": {
      "distribution": {
        "1": 1039,
        "2": 58
        "3": 356,
        "6": 25,
        ...
        "78": 1
      }
    },
    ```

### Using the output of the contract publication command (SaaS and On-Premesis)

When modifying a contract for an existing application version, the following text would be shown in the terminal output for a consumer called "Example Consumer" and a provider called "Example Provider":

```
Updated Example Consumer version 1.2.26 with branch master
Pact with changed content published over existing content for Example Consumer version 1.2.26 and provider Example Provider. This is not recommended in normal circumstances and may indicate that you have not configured your Pact pipeline correctly. For more information see https://docs.pact.io/go/versioning
```

If contract modification is disabled, the following error would be shown:

```
Cannot change the content of the pact for Example Consumer version 1.2.26 and provider Example Provider, as race conditions will cause unreliable results for can-i-deploy. Each pact must be published with a unique consumer version number. Some Pact libraries generate random data when a concrete value for a type matcher is not specified, and this can cause the contract to mutate - ensure you have given example values for all type matchers. For more information see https://docs.pact.io/go/versioning
 {
   "interactions": [
     {
-      "description": "a request to list TODOs"
+      "description": "a request to list TODOs 2"
     }
   ]
 }
```

### Checking the logs (On-Premesis only)

Check the start up logs of the PactFlow application to determine the value for the configuration property `allow_dangerous_contract_modification`. The logs will look like this (depending on your log format):

```
01:18:30 I -- allow_dangerous_contract_modification=false source=...
```

If the value is `false`, then no further action is required.

## How to identify which applications have contracts which are being modified

### SaaS

Please open a [support case](https://support.smartbear.com/pactflow/message) and request the Customer Care team to provide a list of applications with modified contracts.

### On-premesis

Run the following SQL query against the Postgres database:

```sql
select distinct c.name as consumer_name
from pact_publications pp
join (select consumer_version_id
    from pact_publications
    group by consumer_version_id
    having count(*) > 1 ) as mpp
  on mpp.consumer_version_id = pp.consumer_version_id
join pacticipants c
  on pp.consumer_id = c.id
order by 1
```

## How to avoid contract modification

To ensure a pipeline is publishing contracts in the correct way, follow these guidelines:

* Ensure each contract is published with a deterministic version number that *is* or *contains* the git sha, as per https://docs.pact.io/go/versioning
* If the recommended approach to version numbers is already being used, then it is likely that random data is being used in a pact. You can identify what has changed between pacts by following [this documentation](https://docs.pactflow.io/docs/how_to#see-what-has-changed-in-a-pact). Random data in a pact is often cause by using matcher without providing an example value (in which case, the Pact library provides a random example value). Ensure all matchers have an example value provided. Otherwise, the random data might be being included directly in the test by using test data generation tools.

## Disabling dangerous contract modification

### SaaS

Please open a [support case](https://support.smartbear.com/pactflow/message) and specify that you would like the Customer Care team to disable dangerous contract modification for your account.


## On-premesis

Set the environment variable `PACTFLOW_ALLOW_DANGEROUS_CONTRACT_MODIFICATION=false` and restart the server.
