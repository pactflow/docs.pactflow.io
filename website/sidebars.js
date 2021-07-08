module.exports = {
  docs: [
    "docs/getting-started",
    "docs/tutorials",
    {
      type: "category",
      label: "User Interface",
      items: [
        "docs/user-interface/dashboard",
        {
          type: "category",
          label: "Settings",
          items: [
            "docs/user-interface/settings/api-tokens",
            "docs/user-interface/settings/preferences",
            "docs/user-interface/settings/webhooks",
            "docs/user-interface/settings/secrets",
            "docs/user-interface/settings/users",
            "docs/user-interface/settings/teams",
            "docs/user-interface/settings/authentication",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Features",
      items: [
        "docs/stubs",
        {
          type: "category",
          label: "Roles and permissions",
          items: [
            "docs/permissions/predefined-roles",
            "docs/permissions/permissions",
            "docs/permissions/api-tokens",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Account",
      items: ["docs/billing"],
    },
    "docs/how_to",
    {
      type: "category",
      label: "Troubleshooting",
      items: ["docs/login-help", "docs/webhooks-help", "docs/powershell-guide"],
    },
    "docs/api",
  ],
  university: [
    {
      type: "category",
      label: "Pactflow University",
      items: [
        "docs/workshops",
        {
          type: "category",
          label: "Introduction to Pact",
          items: [
            "docs/workshops/introduction",
            "docs/workshops/introduction/learning",
            "docs/workshops/introduction/readme",
            "docs/workshops/introduction/further",
          ],
        },
        {
          type: "category",
          label: "CI/CD Workshop",
          items: [
            "docs/workshops/ci-cd",
            {
              "Set up CI": [
                "docs/workshops/ci-cd/set-up-ci",
                "docs/workshops/ci-cd/set-up-ci/prerequisites",
                "docs/workshops/ci-cd/set-up-ci/fork-and-clone-the-repositories",
                "docs/workshops/ci-cd/set-up-ci/test-the-builds-in-github-actions",
                "docs/workshops/ci-cd/set-up-ci/configure-consumer-and-provider-pipelines",
                "docs/workshops/ci-cd/set-up-ci/configure-webhook",
                "docs/workshops/ci-cd/set-up-ci/conclusion",
              ],
              "Setup Local Development": [
                "docs/workshops/ci-cd/set-up-local-development",
                "docs/workshops/ci-cd/set-up-local-development/prerequisites",
                "docs/workshops/ci-cd/set-up-local-development/install-dependencies",
                "docs/workshops/ci-cd/set-up-local-development/run-the-applications",
                "docs/workshops/ci-cd/set-up-local-development/run-the-consumer-tests",
                "docs/workshops/ci-cd/set-up-local-development/run-the-provider-tests",
              ],
              Workshop: [
                "docs/workshops/ci-cd/workshop",
                "docs/workshops/ci-cd/workshop/prerequisites",
                "docs/workshops/ci-cd/workshop/prerequisite-concepts",
                "docs/workshops/ci-cd/workshop/how-to-break-everything",
                "docs/workshops/ci-cd/workshop/protecting-the-provider",
                "docs/workshops/ci-cd/workshop/how-not-to-break-everything",
                "docs/workshops/ci-cd/workshop/implementing-the-provider-changes",
                "docs/workshops/ci-cd/workshop/verifying-feature-pacts",
                "docs/workshops/ci-cd/workshop/releasing-the-consumer-code",
                "docs/workshops/ci-cd/workshop/conclusion",
              ],
            },
          ],
        },
        "docs/workshops/advanced",
        "docs/workshops/tutorials",
        {
          type: "category",
          label: "Bi-directional Contracts",
          items: [
            "docs/workshops/bi-directional",
            "docs/workshops/bi-directional/consumer",
            "docs/workshops/bi-directional/provider",
            {
              type: "category",
              label: "Supported Contracts",
              items: ["docs/workshops/bi-directional/contracts/pact", "docs/workshops/bi-directional/contracts/oas"],
            },
          ],
        }
      ]
    }
  ],
  examples: [
    {
      type: "category",
      label: "Examples",
      items: [
        "docs/examples",
        {
          AWS: [
            "docs/examples/aws/sns/consumer/readme",
            "docs/examples/aws/sns/provider/readme",
          ],
          Cypress: ["docs/examples/cypress/readme"],
          "Golang": [
            "docs/examples/golang/consumer/readme",
            "docs/examples/golang/provider/readme",
          ],
          Java: [
            "docs/examples/java/consumer/junit/readme",
            "docs/examples/java/provider-springboot/readme"
          ],
          JS: [
            "docs/examples/js/consumer/readme",
            "docs/examples/js/provider/readme",
          ],
          Kafka: [
            "docs/examples/kafka/js/consumer",
            "docs/examples/kafka/java/consumer",
            "docs/examples/kafka/java/provider",
          ],
          ".NET": [
            "docs/examples/dotnet/consumer/readme",
            "docs/examples/dotnet/provider/readme",
          ],
          Python: [
            "docs/examples/python/consumer/readme",
            "docs/examples/python/provider/readme",
          ],
          "SOAP/XML": [
            "docs/examples/soap/java/consumer",
            "docs/examples/soap/java/provider",
          ],
          "Bi-directional Contracts": [
            "docs/examples/bi-directional/consumer/recordreplay/readme",
            "docs/examples/bi-directional/consumer/wiremock/readme",
            "docs/examples/bi-directional/provider/dredd/readme",
            "docs/examples/bi-directional/provider/postman/readme",
            "docs/examples/bi-directional/provider/restassured/readme",
          ],
        },
      ],
    },
  ],
  onprem: [
    {
      type: "category",
      label: "On-Premises",
      items: [
        {
          type: "category",
          label: "Installation",
          items: [
            "docs/on-premises",
            "docs/on-premises/system-requirements",
            "docs/on-premises/docker-image-registry",
            "docs/on-premises/network-configuration",
            "docs/on-premises/database",
            "docs/on-premises/logging",
            {
              type: "category",
              label: "Authentication",
              items: ["docs/on-premises/authentication/saml"],
            },
            {
              type: "category",
              label: "Application configuration",
              items: [
                "docs/on-premises/environment-variables",
                "docs/on-premises/environment-variables/templates",
                "docs/on-premises/environment-variables/timezones",
                "docs/on-premises/license",
              ],
            },
            "docs/on-premises/docker-compose-example",
            "docs/on-premises/installation/load-testing",
            "docs/on-premises/installation/checklist",
          ],
        },
        {
          type: "category",
          label: "Upgrading",
          items: ["docs/on-premises/upgrading/database-migrations"],
        },
        {
          type: "category",
          label: "Operation",
          items: ["docs/on-premises/authentication"],
        },
        {
          type: "category",
          label: "Troubleshooting",
          items: ["docs/on-premises/troubleshooting"],
        },
        {
          type: "category",
          label: "Releases",
          items: [
            "docs/on-premises/releases/1.11.0",
            "docs/on-premises/releases/1.10.0",
            "docs/on-premises/releases/1.9.0",
            "docs/on-premises/releases/1.8.0",
            "docs/on-premises/releases/1.7.0",
            "docs/on-premises/releases/1.6.1",
            "docs/on-premises/releases/1.6.0",
            "docs/on-premises/releases/1.5.0",
            "docs/on-premises/releases/1.4.1",
            "docs/on-premises/releases/1.4.0"
          ],
        },
      ],
    },
  ],
};
