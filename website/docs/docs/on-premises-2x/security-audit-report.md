---
title: Security audit report
---

## Vulnerability scanning

PactFlow uses the following tools to ensure the On-Premises image is kept as secure as possible.

* Bundler Audit
* NPM audit
* Trivy
* Quay Security Scanner
* Amazon ECR Image scanning

## Reporting vulnerabilities

To report a vulnerability, please [contact security](https://smartbear.com/security/) and ensure you include the relevant CVE, and the name and/or path to the vulnerable component.

## Identifying the correct Ruby version

Many scanning tools have trouble identifying the correct version of Ruby installed on an image because Ruby stores its gems in a directory path that uses the minor version of Ruby (eg. `2.7.0`) rather than the patch version (eg. `2.7.6`). This can be demonstrated by running the following command:

```shell
docker run --rm -it --entrypoint gem quay.io/pactflow/enterprise:latest environment
```

Example output (note the `RUBY VERSION` of `2.7.6` while the `GEM PATHS` use `2.7.0`):

```shell
RubyGems Environment:
  - RUBYGEMS VERSION: 3.1.6
  - RUBY VERSION: 2.7.6 (2022-04-12 patchlevel 219) [x86_64-linux-musl]
  - INSTALLATION DIRECTORY: /usr/local/bundle
  - USER INSTALLATION DIRECTORY: /root/.gem/ruby/2.7.0
  - RUBY EXECUTABLE: /usr/local/bin/ruby
  - GIT EXECUTABLE:
  - EXECUTABLE DIRECTORY: /usr/local/bundle/bin
  - SPEC CACHE DIRECTORY: /root/.gem/specs
  - SYSTEM CONFIGURATION DIRECTORY: /usr/local/etc
  - RUBYGEMS PLATFORMS:
    - ruby
    - x86_64-linux-musl
  - GEM PATHS:
     - /usr/local/bundle
     - /root/.gem/ruby/2.7.0
     - /usr/local/lib/ruby/gems/2.7.0
  - GEM CONFIGURATION:
     - :update_sources => true
     - :verbose => true
     - :backtrace => false
     - :bulk_threshold => 1000
     - "install" => "--no-document"
     - "update" => "--no-document"
  - REMOTE SOURCES:
     - https://rubygems.org/
  - SHELL PATH:
     - /usr/local/bundle/bin
     - /usr/local/sbin
     - /usr/local/bin
     - /usr/sbin
     - /usr/bin
     - /sbin
     - /bin
```

The difficulty that tools have in identifying the correct version of Ruby can lead to false positives being reported. Please check the version of Ruby before submitting a vulnerability report.

## Identifying the installed gem versions

To list the gems installed on the PactFlow image run:

```
docker run --rm -it --entrypoint gem quay.io/pactflow/enterprise:latest "list"
```

## Known advisories

### CVE-2015-9284

#### Component

omniauth gem

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2015-9284](https://nvd.nist.gov/vuln/detail/CVE-2015-9284)

#### Detectable in versions of PactFlow

All.

#### Status

Non-exploitable.

#### Notes

This CVE is a CSRF vulnerability during sign in.  This vulnerability is only exploitable if the initial request from the service provider to the identify provider is vulnerable to a CSRF attack because it uses a GET request without any CSRF protection. In PactFlow, this is not possible as PactFlow uses a POST request method with a CSRF token for the initial request to the IDP, as per the mitigation instructions [here](https://github.com/omniauth/omniauth/wiki/Resolving-CVE-2015-9284).

This can be observed by viewing the source of the login form.

```html
<form action="https://example.com/auth/saml" method="post">
  <input type="hidden" name="authenticity_token" value="i_nnrcJziCKKNMb-FRQtxot2ZE6nsNpIhC_AtsK5Boc=">
  <button type="submit">SAML</button>
</form>
```

### CVE-2021-41816

#### Component

The cgi library included in Ruby before 2.7.5 and 3.x before 3.0.3, and the [cgi gem](https://rubygems.org/gems/cgi) before 0.3.1.

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2021-41816](https://nvd.nist.gov/vuln/detail/CVE-2021-41816)

#### Status

False positive.

#### Notes

This vulnerability only affects platforms that use a 4 byte long data type, typically Windows. The PactFlow base image uses 64 bit Ubuntu Linux, which uses an [8 byte long](https://www.ibm.com/docs/en/ibm-mq/9.0?topic=platforms-standard-data-types-unix-linux-windows).

### CVE-2020-36599

#### Description

lib/omniauth/failure_endpoint.rb in OmniAuth before 1.9.2 (and before 2.0) does not escape the message_key value.

#### Component

omniauth gem

#### Status

Non-exploitable.

#### Detectable in versions of PactFlow

Up to and including 1.19.2.

#### Fixed versions

1.19.3 and later.

#### Notes

PactFlow uses a custom failure endpoint so the vulnerable code is never executed.

### `libpam` and `perl` related security vulnerabilities

The following CVEs affect the `libpam` and `perl` libraries included in the base operating system used by PactFlow’s Docker image (Ubuntu 24.04). These packages are marked as essential system dependencies, and removing them would break standard package (`apt`, `dpkg`) and user management functionality within the container.

We are shipping the image with these packages included, as they are required for basic system operation. PactFlow itself does **not** use the PAM libraries at runtime. If your internal security policies require their removal, see the mitigation guidance below.

#### CVE-2024-10963

##### Affected Components

- libpam0g
- libpam-modules
- libpam-runtime
- libpam-modules-bin  
_Version:_ 1.5.3-5

##### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2024-10963](https://nvd.nist.gov/vuln/detail/CVE-2024-10963)

##### Detectable in versions of PactFlow

2.0.0 and later

##### Notes

These libraries are not used directly by PactFlow. They are included only to satisfy essential system package dependencies (e.g. `login`, `passwd`). Removing them using normal package tools will result in a broken package state.

#### CVE-2024-10041

##### Affected Components

- libpam0g
- libpam-modules
- libpam-runtime
- libpam-modules-bin  
_Version:_ 1.5.3-5

##### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2024-10041](https://nvd.nist.gov/vuln/detail/CVE-2024-10041)

##### Detectable in versions of PactFlow

2.0.0 and later

##### Notes

As above — required only for essential base image functionality, and not invoked or referenced by PactFlow.

#### CVE-2025-40909

##### Affected Components

- perl
- perl-base
- perl-modules-5.38
- libperl5.38t64
_Version:_ 5.38.2-3.2

##### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2024-10963](https://nvd.nist.gov/vuln/detail/CVE-2025-40909)

##### Detectable in versions of PactFlow

2.0.0 and later

##### Notes

As above — required only for essential base image functionality, and not invoked or referenced by PactFlow.

### Mitigation guidance

If you must remove the `libpam*` packages for compliance reasons:

1. Be aware that this action may break the container’s ability to use `apt`, `apt-get`, or `dpkg`.
2. You must force-remove the packages using `dpkg` with dependency resolution disabled:

```sh
dpkg -r --force-depends libpam-modules libpam-runtime libpam0g libpam-modules-bin login passwd
```

3. This may prevent future upgrades or installation of packages within the running container.
4. PactFlow will continue to function correctly, but package management inside the container will be unsupported.

> **Warning:** This operation is not recommended unless you understand and accept the trade-offs.