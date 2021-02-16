---
title: Authentication
---

To make it simpler to access Pactflow, we've rolled out Single Sign On (SSO) authentication with Github and Google.
This is available for users of all Pactflow Plans.

Pactflow also supports authenticating with a SAML IDP on supported plans, please <a href="mailto:support@pactflow.io">email the Pactflow team</a> to enable that.

## How it works

SSO users are automatically provisioned when they first authenticate.

**NOTE:** &nbsp; Changing these settings may require users to either do a hard refresh in their browser (CTRL-F5 on Windows and Linux, CMD-R on Mac OSX) before the next time they try login, or may require them to clear their browser cookies and cache.

## GitHub Authentication

For GitHub authentication, you need to configure the GitHub organisations that you would like users who belong to
be able to log into your broker instance.

![GitHub Authentication Settings](/ui/github-auth.png)

## Google Authentication

For Google authentication, you must configure the Google hosted domains of the users that will be allowed to
log into your broker instance. 

![Google Authentication Settings](/ui/google-auth.png)
