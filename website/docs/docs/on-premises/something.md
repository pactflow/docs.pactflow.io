---
title: Something
---

# Vulnerability scanning

Pactflow uses the following tools to ensure the On-Premises image is kept as secure as possible.

* Bundler Audit
* NPM audit
* Trivy
* Quay Security Scanner
* Amazon ECR Image scanning

# Known vulnerabilities

## CVE-2015-9284

* Component: omniauth
* More information: [https://nvd.nist.gov/vuln/detail/CVE-2015-9284](https://nvd.nist.gov/vuln/detail/CVE-2015-9284)

This is a CSRF vulnerability during sign in. It is mitigated in Pactflow by using a POST request method with a CSRF token for the initial request to the IDP, as per the instructions [here](https://github.com/omniauth/omniauth/wiki/Resolving-CVE-2015-9284).


## CVE-2021-23358

* Component: underscore
* More information: [https://nvd.nist.gov/vuln/detail/CVE-2021-23358](https://nvd.nist.gov/vuln/detail/CVE-2021-23358)

Underscore is a dependency of the HAL Browser (accessible through the UI by clicking the "API Browser" button), which is not currently maintained. The HAL Browser can be disabled by setting the [environment variable](/docs/on-premises/environment-variables#pactflow_use_hal_browser) `PACTFLOW_USE_HAL_BROWSER=false` 
