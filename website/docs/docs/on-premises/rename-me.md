# Disabling dangerous contract modification

Please check the start up logs of the PactFlow application to determine the value for the configuration property `allow_dangerous_contract_modification`. The logs will look like this (depending on your log format):

```
01:18:30 I -- allow_dangerous_contract_modification=false source=...
```

If the value is `true`, then it means that the contract for a particular application version can be modified by a subsequent build. Contract modification can happen when a matcher has been used without an example value and a random value is supplied by the Pact library, or when there is other random data in the contract, or when an application version number is being used that does not have a one-to-one mapping with a git commit (eg. the semantic version is being used for the application version number and multiple contract versions are being published with the same version number).

Allowing contract modification means that the results of the can-i-deploy command cannot be relied on due to race conditions. New installations of PactFlow should disable dangerous contract modification from the start. Existing installations of PactFlow are recommended to disable contract modification after analysis the current situation.

If the contract modification is being relied on by existing CI/CD pipelines, disabling the modification will cause builds to fail, as any attempt to modify an existing contract will be rejected, causing the pact publication task to fail.

For existing installations of PactFlow, you will need to determine whether or not contracts are currently being modified. To do this, login to PactFlow, and click on the API browser button in the top right of the screen. In the Explorer text box, append the path `/metrics` to the URL, and click Go. In the Properties section, identify the `pactRevisionsPerConsumerVersion` object. If the `distribution` object has only property with a key `1`, then you may safely disable contract modification without impacting any CI/CD pipelines.

```
# Disabling contract modification will have no impact as contracts are not being modified
"pactRevisionsPerConsumerVersion": {
    "distribution": {
      "1": 916
    }
  },
```

If, however, there is a large distribution of revisions per consumer version, then one or more of your application pipelines is modifying contracts.

```
# Disabling contract modification will likely cause builds to fail. One application in particular is likely to be affected
# as can be seen by the one application version which has 78 revisions.
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

To ensure a pipeline is publishing contracts in the correct way, follow these guidelines:

* Ensure each contract is published with a deterministic version number that relates to or contains the git sha, as per https://docs.pact.io/getting_started/versioning_in_the_pact_broker
* If the recommended approach to version numbers is being used, then it is likely that random data is being used in a pact. You can identify what has changed between pacts by following [this documentation](https://docs.pactflow.io/docs/how_to#see-what-has-changed-in-a-pact). Random data in a pact is often cause by using matcher without providing an example value (in which case, the Pact library provides a random example value). Ensure all matchers have an example value provided. Otherwise, the random data might be being included directly in the test by using test data generation tools.

Once all the recommendations have been implemented, disable dangerous contract modification by setting the following environment variable.

`PACTFLOW_ALLOW_DANGEROUS_CONTRACT_MODIFICATION=false`
