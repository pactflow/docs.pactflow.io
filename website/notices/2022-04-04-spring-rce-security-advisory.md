---
slug: 2022-04-04-spring-rce-security-advisory
title: Security Advisory - Spring RCE (CVE-2022-22965)
author: Matt Fellows
author_title: Co-founder @ PactFlow
author_url: https://github.com/mefellows
author_image_url: https://secure.gravatar.com/avatar/32ca6dc55ad8675eaea178f42926f608
tags: [spring, security]
---

This security advisory provides customers with an update on how Pact and PactFlow services are affected by the Spring RCE vulnerability ([CVE-2022-22965](https://tanzu.vmware.com/security/cve-2022-22965)). This vulnerability has been referred to as SpringShell by some outlets.

## What is this vulnerability?

A Remote Code Execution (RCE) vulnerability was discovered in the popular Spring Framework on 31st March 2022:

> The vulnerability impacts Spring MVC and Spring WebFlux applications running on JDK 9+. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.

## How does this vulnerability affect Pact or PactFlow?

PactFlow immediately began investigating its environment to identify any affected systems. After an investigation was completed, it was determined that:

- Spring (and indeed, the JVM) is not used in any of PactFlow's services
- None of the Open Source clients (such as Pact JVM) are vulnerable

This vulnerability exists when:

- Running on JDK 9 or higher
- Apache Tomcat as the Servlet container.
- Packaged as a traditional WAR (in contrast to a Spring Boot executable jar).
- spring-webmvc or spring-webflux dependency.
- Spring Framework versions 5.3.0 to 5.3.17, 5.2.0 to 5.2.19, and older versions.

When Pact tests are run, they are run as tests or build tasks, and are not deployed anywhere (to Tomcat or otherwise). Also, Pact-JVM does not use Tomcat at all, but relies on Netty for its internal server components.

## What actions should I take?

Users of Pact or PactFlow do not need to take any action at this time.

## Where can I find more information?

Additional information on this vulnerability can be found here:

- [CVE-2022-22965](https://tanzu.vmware.com/security/cve-2022-22965)
