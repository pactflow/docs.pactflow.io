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
