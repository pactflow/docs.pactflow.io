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

## Known vulnerabilities

### CVE-2015-9284

#### Component

omniauth gem

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2015-9284](https://nvd.nist.gov/vuln/detail/CVE-2015-9284)

#### Notes

This is a CSRF vulnerability during sign in. 

#### Affected versions of Pactflow

All.

#### Mitigation

This vulnerability is mitigated in code. Pactflow uses a POST request method with a CSRF token for the initial request to the IDP, as per the instructions [here](https://github.com/omniauth/omniauth/wiki/Resolving-CVE-2015-9284).

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

## Commonly reported false positives

### CVE-2021-41816

This only affects Ruby before 2.7.5 and 3.x before 3.0.3. Pactflow 1.19.0 and later uses Ruby 2.7.6. To identify the Ruby version, run the following command:

```shell
docker run --rm -it --entrypoint ruby quay.io/pactflow/enterprise "-v"
```
