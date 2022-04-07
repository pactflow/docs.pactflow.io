# 11. Conclusion

🚀 If you've made it this far, you should now have a good understanding of how Pactflow's bi-directional contract testing feature works to make it safe to release software into production quickly and reliably.

## Next Steps?

Here are a few things to try to see what scenarios Pact can help you with:

1.  Try changing the provider code in a backwards incompatible way, what happens?

        // First remove the 'id' key in the provider.js file, then run
        npm run test:provider
        npm run can-deploy:provider

This should fail!

2.  Try changing the provider code in a way that won't break existing consumers, but in a traditional "backwards incompatible" way, what happens?

        // First remove the 'version' key in the provider.js file, then run
        npm run test:provider
        npm run can-deploy:provider

This should _not_ fail - no consumers need this field!

3.  Try adding a new expectation on the provider by updating the contract:

        npm run test:consumer
        npm run publish
        npm run can-deploy:consumer

You shouldn't be able to deploy!

## Further material

You may be interested in one of our other [workshops](https://docs.pact.io/implementation_guides/workshops), or getting deeper into [BDCT](docs/bi-directional-contract-testing).
