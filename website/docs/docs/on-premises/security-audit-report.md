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

### CVE-2022-2625

#### Description

Given certain prerequisites, this vulnerability allows arbitrary code to be run.

#### Component

postgresql14-dev package for Alpine

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2022-2625](https://nvd.nist.gov/vuln/detail/CVE-2022-2625)

#### Status

Non-exploitable.

#### Notes

This vulnerability applies to the PostgreSQL server only. The PactFlow Docker image only uses the PostgreSQL client, and hence is not affected by this vulnerability.

### CVE-2022-37434

#### Description

A heap-based buffer over-read or buffer overflow in inflate in inflate.c via a large gzip header extra field.

#### Component

zlib package for Alpine

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2022-37434](https://nvd.nist.gov/vuln/detail/CVE-2022-37434)

#### Affected versions of PactFlow

All.

#### Status

Unfixed.

#### Notes

As of 24 August 2022, there is no fix available. A patch release of PactFlow will be put out as soon as a fix is available.

### CVE-2021-41816

#### Component

The cgi library included in Ruby before 2.7.5 and 3.x before 3.0.3, and the [cgi gem](https://rubygems.org/gems/cgi) before 0.3.1.

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2021-41816](https://nvd.nist.gov/vuln/detail/CVE-2021-41816)

#### Status

False positive.

#### Notes

This vulnerability only affects platforms that use a 4 byte long data type, typically Windows. The PactFlow base image uses 64 bit Alpine Linux, which uses an [8 byte long](https://www.ibm.com/docs/en/ibm-mq/9.0?topic=platforms-standard-data-types-unix-linux-windows).

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

### CVE-2025-22872

#### Description

The https://pkg.go.dev/golang.org/x/net package tokenizer incorrectly interprets tags with unquoted attribute values that end with a solidus character (/) as self-closing. When directly using Tokenizer, this can result in such tags incorrectly being marked as self-closing, and when using the Parse functions, this can result in content following such tags as being placed in the wrong scope during DOM construction, but only when tags are in foreign content (e.g. `<math>`, `<svg>`, etc contexts).

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2025-22872](https://nvd.nist.gov/vuln/detail/CVE-2025-22872)

#### Component

`dockerize` (a command-line utility available to use as a helpful entrypoint when starting PactFlow).

#### Status

Non-exploitable.

#### Detectable in versions of PactFlow

Up to and including 1.37.0.

#### Fixed versions

n/a

#### Notes

`dockerize` is not, and cannot, be used in a web-based context where the XSS threat is present. 

### CVE-2025-22874 

#### Description

Calling `Verify` with a `VerifyOptions.KeyUsages` that contains `ExtKeyUsageAny` unintentionally disabled policy validation. This only affected certificate chains which contain policy graphs, which are rather uncommon.

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2025-22872](https://nvd.nist.gov/vuln/detail/CVE-2025-22872)

#### Component

`dockerize` (a command-line utility available to use as a helpful entrypoint when starting PactFlow).

#### Status

Non-exploitable.

#### Detectable in versions of PactFlow

Up to and including 1.37.0.

#### Fixed versions

n/a

#### Notes

The primary use of `dockerize` in PactFlow is to wait for the network availability of a local, trusted connection on the *same* host - i.e. the PactFlow application - before starting the main process and marking the service as available. Customers should be aware of the potential risk if used in other use cases.