---
id: install-dependencies
title: Install dependencies
---

1. Clone the repositories on to your local machine.

    ```bash
    git clone git@github.com:<YOUR_GITHUB_USERNAME>/example-consumer.git
    git clone git@github.com:<YOUR_GITHUB_USERNAME>/example-provider.git
    ```

2. Install the dependencies in each project.

    ```bash
    cd example-consumer
    npm install
    cd ../example-provider
    npm install
    ```

<!-- we should update the example repos to have make deps or make install as we should have interchangeable repos on the consumer, or provider side -->
