FROM node:12-alpine
RUN apk -v --update add \
        python3 \
        py-pip \
        groff \
        less \
        mailcap \
        bash \
        dumb-init \
        jq \
        docker \
        autoconf \
        automake \
        alpine-sdk \
        && \
    pip install --upgrade pip && \
    pip install --upgrade awscli python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

VOLUME /root/.aws
VOLUME /var/run/docker.sock
VOLUME /workdir
WORKDIR /workdir