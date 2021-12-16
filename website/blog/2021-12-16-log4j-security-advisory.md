---
slug: 2021-12-16-log4j-security-advisory
title: Security Advisory - Apache Log4j (CVE-2021-44228)
author: Matt Fellows
author_title: Co-founder @ Pactflow
author_url: https://github.com/mefellows
author_image_url: https://secure.gravatar.com/avatar/32ca6dc55ad8675eaea178f42926f608
tags: [log4j, security]
---

This security advisory provides customers with an update on how Pactflow services are affected by the Apache Log4j vulnerability (CVE-2021-44228). This vulnerability has been referred to as Log4Shell by some outlets.

## What is this vulnerability?

A Remote Code Execution (RCE) vulnerability was discovered in the popular Java logging library, Log4j. This industry-wide security vulnerability allows for an unauthenticated adversary to execute code on systems that have this library deployed, by providing specific crafted content. This is a serious vulnerability that affects many software products and online services.

## How does this vulnerability affect Pactflow?

Pactflow immediately began investigating its environment to identify any affected systems. After an investigation was completed, it was determined that:

- The Log4j library is not implemented in any of Pactflow's application services or SDKs;
- The Log4j library is not used by any of our open source clients (e.g. Pact JVM).

## What actions should I take?

Users of Pact or Pactflow do not need to take any action at this time.

## Where can I find more information?

Additional information on this vulnerability can be found here:

- Apache Software Foundation: [Apache Log4j Security Vulnerabilities](https://logging.apache.org/log4j/2.x/security.html)
- National Vulnerability Database: [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228)
