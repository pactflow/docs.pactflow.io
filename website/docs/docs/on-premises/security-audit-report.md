---
title: Security audit report
---

## Vulnerability scanning

Pactflow uses the following tools to ensure the On-Premises image is kept as secure as possible.

* Bundler Audit
* NPM audit
* Trivy
* Quay Security Scanner
* Amazon ECR Image scanning

## Reporting vulnerabilities

To report a vulnerability, please email us at [support@pactflow.io](mailto:support@pactflow.io) and ensure you include the relevant CVE, and the name and/or path to the vulnerable component.

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

To list the gems installed on the Pactflow image run:

```
docker run --rm -it --entrypoint gem quay.io/pactflow/enterprise:latest "list"
```

## Known vulnerabilities

### CVE-2015-9284

#### Component

omniauth gem

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2015-9284](https://nvd.nist.gov/vuln/detail/CVE-2015-9284)

#### Affected versions of Pactflow

All.

#### Status

Non-exploitable.

#### Notes

This CVE is a CSRF vulnerability during sign in.  This vulnerability is only exploitable if the initial request from the service provider to the identify provider is vulnerable to a CSRF attack because it uses a GET request without any CSRF protection. In Pactflow, this is not possible as Pactflow uses a POST request method with a CSRF token for the initial request to the IDP, as per the mitigation instructions [here](https://github.com/omniauth/omniauth/wiki/Resolving-CVE-2015-9284).

This can be observed by viewing the source of the login form.

```html
<form action="https://example.com/auth/saml" method="post">
  <input type="hidden" name="authenticity_token" value="i_nnrcJziCKKNMb-FRQtxot2ZE6nsNpIhC_AtsK5Boc=">
  <button type="submit">SAML</button>
</form>
```


### CVE-2022-2625

#### Component

postgresql14-dev package for Alpine

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2022-2625](https://nvd.nist.gov/vuln/detail/CVE-2022-2625)

#### Affected versions of Pactflow

All.

#### Notes

This vulnerability applies to the PostgreSQL server only. The Pactflow Docker image only uses the PostgreSQL client, and hence is not affected by this vulnerability.

### CVE-2022-37434

#### Component

zlib package for Alpine

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2022-37434](https://nvd.nist.gov/vuln/detail/CVE-2022-37434)

#### Affected versions of Pactflow

All.

#### Notes

As of 24 August 2022, there is no fix available. A patch release of Pactflow will be put out as soon as a fix is available.

### CVE-2021-41816

#### Component

The cgi library included in Ruby before 2.7.5 and 3.x before 3.0.3, and the [cgi gem](https://rubygems.org/gems/cgi) before 0.3.1.

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2021-41816](https://nvd.nist.gov/vuln/detail/CVE-2021-41816)

#### Affected versions of Pactflow

Versions prior to 1.18.0, which use Ruby 2.7.5.

#### Fixed versions

Pactflow 1.18.0 and later, which use Ruby 2.7.6.

#### Notes

The cgi library included with the Ruby platform will show as having a version of `0.1.0.1`. This is not the same as the cgi gem, which is not installed on the Pactflow Docker image. 
