---
title: Secrets
---

&nbsp;

![Secrets Screen](assets/ui/secrets.png)

&nbsp;

You can create your own variables to store sensitive values like usernames and passwords here. These will be encrypted and then stored in the Pactflow platform and available to use when creating your webhooks.

&nbsp;

![Secrets Screen](assets/ui/secrets-form.png)

&nbsp;

| Field | Description |
| ---------- | ----------- |
| Name | Give a name to your secret. This will be available as a dynamic variable prefixed with `user.`. For instance, if you create a `JenkinsUser` secret you can access it as `${user.JenkinsUser}`. |
| Description | Describe what your secret is here. |
| Value | The value you need encrypted. |