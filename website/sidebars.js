module.exports = {
  docs: [
    'docs/getting-started',
    {
      type: 'category',
      label: 'User Interface',
      items: [
        {
          type: 'category',
          label: 'New UI ✨',
          items: [
            'docs/user-interface/migration/new',
            'docs/user-interface/dashboard',
            'docs/user-interface/application',
            'docs/user-interface/contract',
            'docs/user-interface/bi-directional',
            {
              type: 'category',
              label: 'Settings',
              items: [
                'docs/user-interface/settings/api-tokens',
                'docs/user-interface/settings/preferences',
                'docs/user-interface/settings/webhooks',
                'docs/user-interface/settings/secrets',
                'docs/user-interface/settings/users',
                'docs/user-interface/settings/system-accounts',
                'docs/user-interface/settings/teams',
                'docs/user-interface/settings/roles',
                'docs/user-interface/settings/environments'
              ]
            },
            'docs/user-interface/migration/guide',
          ]
        },     
        {
          type: 'category',
          label: 'Legacy UI',
          items: [
            'docs/ui-old/dashboard',
            'docs/ui-old/bi-directional',
            'docs/ui-old/can-i-deploy',
            {
              type: 'category',
              label: 'Settings',
              items: [
                'docs/ui-old/settings/api-tokens',
                'docs/ui-old/settings/preferences',
                'docs/ui-old/settings/webhooks',
                'docs/ui-old/settings/secrets',
                'docs/ui-old/settings/users',
                'docs/ui-old/settings/teams',
                'docs/ui-old/settings/environments'
              ]
            }
          ]
        },     
      ]
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        {
          type: 'category',
          label: 'AI ⚡️',
          items: [
            'docs/ai/index',
            'docs/ai/quick-start',
            'docs/ai/using',
            'docs/ai/managing',
            'docs/ai/troubleshooting',
            'docs/ai/learning',
          ]
        },
        'docs/stubs',
        {
          type: 'category',
          label: 'Roles and permissions',
          items: [
            'docs/permissions/predefined-roles',
            'docs/permissions/permissions',
            'docs/permissions/api-tokens'
          ]
        },
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'docs/authentication/main',
            'docs/authentication/legacy'
          ]
        },
        {
          type: 'category',
          label: 'SCIM',
          items: [
            'docs/scim/main',
            'docs/scim/okta'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Contract Testing',
      items: [
        'docs/pact',
        {
          type: 'category',
          label: 'Bi-Directional Contract Testing',
          items: [
            'docs/bi-directional-contract-testing',
            'docs/bi-directional-contract-testing/consumer',
            'docs/bi-directional-contract-testing/provider',
            'docs/bi-directional-contract-testing/publishing',
            'docs/bi-directional-contract-testing/compatibility-checks',
            'docs/bi-directional-contract-testing/deploying',
            {
              type: 'category',
              label: 'Supported Contracts',
              items: [
                'docs/bi-directional-contract-testing/contracts/pact',
                {
                  type: 'category',
                  label: 'OpenAPI Specification',
                  items: [
                    'docs/bi-directional-contract-testing/contracts/oas',
                    'docs/bi-directional-contract-testing/contracts/oas/features',
                    'docs/bi-directional-contract-testing/contracts/oas/keyword-support',
                    'docs/bi-directional-contract-testing/contracts/oas/changelog'
                  ]
                }
              ]
            },
            {
              type: 'category',
              label: 'Tool Integration',
              items: [
                'docs/bi-directional-contract-testing/tools',
                'docs/bi-directional-contract-testing/tools/swaggerhub',
                'docs/bi-directional-contract-testing/tools/cypress',
                'docs/bi-directional-contract-testing/tools/msw',
                'docs/bi-directional-contract-testing/tools/wiremock',
                'docs/bi-directional-contract-testing/tools/wiremock-net'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Account',
      items: ['docs/billing']
    },
    {
      type: 'category',
      label: 'Integrations',
      items: ['docs/integrations/swaggerhub']
    },
      {
      type: 'category',
      label: 'Troubleshooting',        
      items: ['docs/troubleshooting/glossary', 'docs/login-help', `docs/authorization-help`, 'docs/webhooks-help', 'docs/powershell-guide', 'docs/troubleshooting/disabling-dangerous-contract-modification', 'docs/troubleshooting/slow-response-when-fetching-pacts-for-verification']
    },
    {
      type: 'link',
      label: 'API',
      href: 'https://smartbear.portal.swaggerhub.com/pactflow/default/getting-started'
    }
  ],
  university: [
    {
      type: 'category',
      label: 'PactFlow University',
      items: [
        'docs/workshops',
        'docs/tutorials',
        {
          type: 'category',
          label: 'Introduction to Pact',
          items: [
            'docs/workshops/introduction',
            'docs/workshops/introduction/learning',
            'docs/workshops/introduction/readme',
            'docs/workshops/introduction/further'
          ]
        },
        {
          type: 'category',
          label: 'Consumer-Driven Contract Testing CI/CD',
          items: [
            'docs/workshops/ci-cd',
            {
              'Set up CI': [
                'docs/workshops/ci-cd/set-up-ci',
                'docs/workshops/ci-cd/set-up-ci/prerequisites',
                'docs/workshops/ci-cd/set-up-ci/fork-the-repositories',
                'docs/workshops/ci-cd/set-up-ci/test-the-builds-in-github-actions',
                'docs/workshops/ci-cd/set-up-ci/configure-consumer-and-provider-pipelines',
                'docs/workshops/ci-cd/set-up-ci/configure-webhook',
                'docs/workshops/ci-cd/set-up-ci/conclusion'
              ],
              'Setup Local Development': [
                'docs/workshops/ci-cd/set-up-local-development',
                'docs/workshops/ci-cd/set-up-local-development/prerequisites',
                'docs/workshops/ci-cd/set-up-local-development/install-dependencies',
                'docs/workshops/ci-cd/set-up-local-development/run-the-applications',
                'docs/workshops/ci-cd/set-up-local-development/run-the-consumer-tests',
                'docs/workshops/ci-cd/set-up-local-development/run-the-provider-tests'
              ],
              Workshop: [
                'docs/workshops/ci-cd/workshop',
                'docs/workshops/ci-cd/workshop/prerequisites',
                'docs/workshops/ci-cd/workshop/prerequisite-concepts',
                'docs/workshops/ci-cd/workshop/protecting-the-provider',
                'docs/workshops/ci-cd/workshop/how-not-to-break-everything',
                'docs/workshops/ci-cd/workshop/implementing-the-provider-changes',
                'docs/workshops/ci-cd/workshop/verifying-feature-pacts',
                'docs/workshops/ci-cd/workshop/releasing-the-consumer-code',
                'docs/workshops/ci-cd/workshop/conclusion'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Consumer-Driven Contract Testing CI/CD (legacy)',
          items: [
            'docs/workshops/ci-cd-legacy',
            {
              'Set up CI': [
                'docs/workshops/ci-cd-legacy/set-up-ci',
                'docs/workshops/ci-cd-legacy/set-up-ci/prerequisites',
                'docs/workshops/ci-cd-legacy/set-up-ci/fork-the-repositories',
                'docs/workshops/ci-cd-legacy/set-up-ci/test-the-builds-in-github-actions',
                'docs/workshops/ci-cd-legacy/set-up-ci/configure-consumer-and-provider-pipelines',
                'docs/workshops/ci-cd-legacy/set-up-ci/configure-webhook',
                'docs/workshops/ci-cd-legacy/set-up-ci/conclusion'
              ],
              'Setup Local Development': [
                'docs/workshops/ci-cd-legacy/set-up-local-development',
                'docs/workshops/ci-cd-legacy/set-up-local-development/prerequisites',
                'docs/workshops/ci-cd-legacy/set-up-local-development/install-dependencies',
                'docs/workshops/ci-cd-legacy/set-up-local-development/run-the-applications',
                'docs/workshops/ci-cd-legacy/set-up-local-development/run-the-consumer-tests',
                'docs/workshops/ci-cd-legacy/set-up-local-development/run-the-provider-tests'
              ],
              Workshop: [
                'docs/workshops/ci-cd-legacy/workshop',
                'docs/workshops/ci-cd-legacy/workshop/prerequisites',
                'docs/workshops/ci-cd-legacy/workshop/prerequisite-concepts',
                'docs/workshops/ci-cd-legacy/workshop/how-to-break-everything',
                'docs/workshops/ci-cd-legacy/workshop/protecting-the-provider',
                'docs/workshops/ci-cd-legacy/workshop/how-not-to-break-everything',
                'docs/workshops/ci-cd-legacy/workshop/implementing-the-provider-changes',
                'docs/workshops/ci-cd-legacy/workshop/verifying-feature-pacts',
                'docs/workshops/ci-cd-legacy/workshop/releasing-the-consumer-code',
                'docs/workshops/ci-cd-legacy/workshop/conclusion'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Design First With SwaggerHub',
          items: ['docs/workshops/quick_starts/design_first'],
        },        
        {
          type: 'category',
          label: 'Bi-Directional Contract Testing',
          items: [
            'docs/workshops/bi-directional-contract-testing',
            {
              Workshop: [
                'docs/workshops/bi-directional/pre_requisites',
                'docs/workshops/bi-directional/step1',
                'docs/workshops/bi-directional/step2',
                'docs/workshops/bi-directional/step3',
                'docs/workshops/bi-directional/step4',
                'docs/workshops/bi-directional/step5',
                'docs/workshops/bi-directional/step6',
                'docs/workshops/bi-directional/step7',
                'docs/workshops/bi-directional/step8',
                'docs/workshops/bi-directional/step9',
                'docs/workshops/bi-directional/step10',
                'docs/workshops/bi-directional/step11'
              ]
            },
            'docs/workshops/quick_starts/bdc'
          ]
        },
        {
          type: 'category',
          label: 'Advanced Pact',
          items: ['docs/workshops/advanced', 'docs/workshops/org_scale']
        },
        'docs/workshops/tutorials'
      ]
    }
  ],
  examples: [
    {
      type: 'category',
      label: 'Examples',
      items: [
        'docs/examples',
        {
          AWS: [
            'docs/examples/aws/sns/consumer/readme',
            'docs/examples/aws/sns/consumer/python/readme',
            'docs/examples/aws/sns/provider/readme'
          ],
          Cypress: ['docs/examples/cypress/readme'],
          Golang: [
            'docs/examples/golang/consumer/readme',
            'docs/examples/golang/provider/readme'
          ],
          Java: [
            'docs/examples/java/consumer/graphql/readme',
            'docs/examples/java/consumer/junit/readme',
            'docs/examples/java/provider/graphql/readme',
            'docs/examples/java/provider-springboot/readme'
          ],
          JS: [
            'docs/examples/js/consumer/readme',
            'docs/examples/js/provider/readme'
          ],
          Kafka: [
            'docs/examples/kafka/js/consumer',
            'docs/examples/kafka/java/consumer',
            'docs/examples/kafka/java/provider'
          ],
          '.NET': [
            'docs/examples/dotnet/consumer/readme',
            'docs/examples/dotnet/provider/readme'
          ],
          Python: [
            'docs/examples/python/consumer/readme',
            'docs/examples/python/provider/readme'
          ],
          'SOAP/XML': [
            'docs/examples/soap/java/consumer',
            'docs/examples/soap/java/provider'
          ],
          'Bi-Directional Contract Testing': [
            'docs/examples/bi-directional/consumer/recordreplay/readme',
            'docs/examples/bi-directional/consumer/wiremock/readme',
            'docs/examples/bi-directional/consumer/cypress/readme',
            'docs/examples/bi-directional/consumer/mountebank/readme',
            'docs/examples/bi-directional/consumer/msw/readme',
            'docs/examples/bi-directional/consumer/playwright_js/readme',
            'docs/examples/bi-directional/consumer/dotnet/readme',
            'docs/examples/bi-directional/provider/readyapi/readme',
            'docs/examples/bi-directional/provider/soapui/readme',
            'docs/examples/bi-directional/provider/dredd/readme',
            'docs/examples/bi-directional/provider/postman/readme',
            'docs/examples/bi-directional/provider/restassured/readme',
            'docs/examples/bi-directional/provider/dotnet/readme'
          ]
        }
      ]
    }
  ],
  onprem: [
    {
      type: 'category',
      label: 'On-Premises',
      items: [
        {
          type: 'category',
          label: 'Installation',
          items: [
            'docs/on-premises',
            'docs/on-premises/system-requirements',
            'docs/on-premises/docker-image-registry',
            'docs/on-premises/network-configuration',
            'docs/on-premises/installation/migrating',
            'docs/on-premises/database',
            'docs/on-premises/logging',
            {
              type: 'category',
              label: 'Authentication',
              items: [
                'docs/on-premises/authentication/demo',
                'docs/on-premises/authentication/saml'
              ]
            },
            {
              type: 'category',
              label: 'Application configuration',
              items: [
                'docs/on-premises/environment-variables',
                'docs/on-premises/environment-variables/templates',
                'docs/on-premises/environment-variables/timezones',
                'docs/on-premises/license'
              ]
            },
            'docs/on-premises/docker-compose-example',
            'docs/on-premises/installation/load-testing',
            'docs/on-premises/installation/checklist'
          ]
        },
        {
          type: 'category',
          label: 'Upgrading',
          items: ['docs/on-premises/upgrading/database-migrations']
        },
        {
          type: 'category',
          label: 'Operation',
          items: ['docs/on-premises/authentication']
        },
        {
          type: 'category',
          label: 'Maintenance',
          items: ['docs/on-premises/maintenance/database']
        },
        {
          type: 'category',
          label: 'SCIM',
          items: [
            'docs/on-premises/scim'
          ]
        },
        {
          type: 'category',
          label: 'Security and support',
          items: [
            'docs/on-premises/security-audit-report',
            'docs/on-premises/support-policy'
          ]
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          items: ['docs/on-premises/troubleshooting']
        },
        {
          type: 'category',
          label: 'Releases',
          items: [
//on-prem-release-placeholder
            'docs/on-premises/releases/1.36.0',
            'docs/on-premises/releases/1.35.0',
            'docs/on-premises/releases/1.34.0',
            'docs/on-premises/releases/1.33.0',
            'docs/on-premises/releases/1.32.0',
            'docs/on-premises/releases/1.31.0',
            'docs/on-premises/releases/1.30.0',
            'docs/on-premises/releases/1.29.0',
            'docs/on-premises/releases/1.28.0',
            'docs/on-premises/releases/1.27.0',
            'docs/on-premises/releases/1.26.0',
            'docs/on-premises/releases/1.25.0',
            'docs/on-premises/releases/1.24.0',
            'docs/on-premises/releases/1.23.1',
            'docs/on-premises/releases/1.23.0',
            'docs/on-premises/releases/1.22.1',
            'docs/on-premises/releases/1.22.0',
            'docs/on-premises/releases/1.21.1',
            'docs/on-premises/releases/1.21.0',
            'docs/on-premises/releases/1.20.0',
            'docs/on-premises/releases/1.19.2',
            'docs/on-premises/releases/1.19.1',
            'docs/on-premises/releases/1.19.0',
            'docs/on-premises/releases/1.18.0',
            'docs/on-premises/releases/1.17.3',
            'docs/on-premises/releases/1.17.2',
            'docs/on-premises/releases/1.17.1',
            'docs/on-premises/releases/1.17.0',
            'docs/on-premises/releases/1.16.0',
            'docs/on-premises/releases/1.15.0',
            'docs/on-premises/releases/1.14.8',
            'docs/on-premises/releases/1.14.7',
            'docs/on-premises/releases/1.14.6',
            'docs/on-premises/releases/1.14.5',
            'docs/on-premises/releases/1.14.4',
            'docs/on-premises/releases/1.14.3',
            'docs/on-premises/releases/1.14.2',
            'docs/on-premises/releases/1.14.1',
            'docs/on-premises/releases/1.14.0',
            'docs/on-premises/releases/1.13.1',
            'docs/on-premises/releases/1.13.0',
            'docs/on-premises/releases/1.12.0',
            'docs/on-premises/releases/1.11.1',
            'docs/on-premises/releases/1.11.0',
            'docs/on-premises/releases/1.10.0',
            'docs/on-premises/releases/1.9.0',
            'docs/on-premises/releases/1.8.0',
            'docs/on-premises/releases/1.7.0',
            'docs/on-premises/releases/1.6.1',
            'docs/on-premises/releases/1.6.0',
            'docs/on-premises/releases/1.5.0',
            'docs/on-premises/releases/1.4.1',
            'docs/on-premises/releases/1.4.0'
          ]
        }
      ]
    }
  ]
};
