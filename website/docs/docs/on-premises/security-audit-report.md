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

omniauth

#### CVE

[https://nvd.nist.gov/vuln/detail/CVE-2015-9284](https://nvd.nist.gov/vuln/detail/CVE-2015-9284)

#### Notes

This is a CSRF vulnerability during sign in. 

#### Mitigation

This vulnerability is mitigated in code. Pactflow uses a POST request method with a CSRF token for the initial request to the IDP, as per the instructions [here](https://github.com/omniauth/omniauth/wiki/Resolving-CVE-2015-9284).

