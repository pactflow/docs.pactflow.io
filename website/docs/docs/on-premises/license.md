---
title: License file
---

The Pactflow on-premises version requires a license file to run. You should have received this from us during the
on-boarding process. If not, please contact us at support@pactflow.io.

The license file needs to be mounted into the docker container at the `/home/pactflow-onprem.lic` path. This can
be done by either using a volume mount or building a new image with the license file in it.

## Volume mounting the license file

Refer to the docker documentation on using [volumes](https://docs.docker.com/storage/volumes/).

For an example, you can use the docker CLI `-v` parameter to mount the license file (i.e. if the license file
is stored at `/opt/pactflow/pactflow-onprem.lic` on your server, then `-v /opt/pactflow/pactflow-onprem.lic/pactflow-onprem.lic:/home/pactflow-onprem.lic` will mount it).

## Building a new image with the license file in

You can also create a new docker file with the license file baked in. Here is an example docker build file that does that:

```dockerfile
ARG ONPREM_IMAGE
FROM ${ONPREM_IMAGE}

COPY --chown=app:app pactflow-onprem.lic $APP_HOME/../pactflow-onprem.lic
```

This can then be built with the following docker command:

```console
$ docker build . --build-arg ONPREM_IMAGE=quay.io/pactflow/enterprise:1.10.0
```

## Customising the location of the license file

If mounting the license file in `/home` is not desirable, you can specify a custom directory using the `RG_LIC_PATH` environment variable.

For example, to change the path to `/opt/pactflow/pactflow-onprem.lic` you would set the environment variable in the container to `RG_LIC_PATH=/opt/pactflow/`.

## License enforcement

The license provided encodes your designated subscription limits, such as your allocated number of users and the expiration date of your subscription. These limits are enforced by the application at runtime. In the event you have an invalid or incompatible license, the system will not boot and will provide an error in your system log file

<!-- Users with the [`Administrator`](/docs/permissions/predefined-roles#administrator) role can see the current license information on the [billing and subscriptions page](/docs/billing). -->

In the event the license does expire, the [health check endpoint](/docs/on-premises#healthcheck-endpoint) will continue to remain operational.

## FAQ

### What happens when I reach my licenses user limit?

New users will be unable to login and will receive a message indicating the user limit has been reached.

You can rectify this by:

1. Disabling any users that no longer require access to Pactflow
2. Upgrading your subscription to allow more users

### What happens when my license expires?

Well ahead of your license expiration you will be contacted from a SmartBear representative to help with ensuring a smooth transition from your expiring license to a new one.

Pactflow will provide in-application notices when there are 30 days or less until expiry of the subscription. The notices will be displayed on both the login screen and in the footer.

When the subscription reaches its end date, if the license has not been replaced you will lose access to Pactflow and the system will cease to function (with the exception of the [health check endpoint](/docs/on-premises#healthcheck-endpoint)).
