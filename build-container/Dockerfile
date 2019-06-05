FROM node:12-stretch
RUN apt-get update && apt-get install -y python3 \
        python3-pip \
        jq \
        docker \
        autoconf \
        automake \
        build-essential \
        && \
    # pip3 install --upgrade pip && \
    pip3 install --upgrade awscli python-magic && \
    rm -rf /var/lib/apt/lists/*

VOLUME /root/.aws
VOLUME /var/run/docker.sock
VOLUME /workdir
WORKDIR /workdir

RUN groupadd --gid 501 build \
  && useradd --uid 502 --gid build --shell /bin/bash --create-home build
