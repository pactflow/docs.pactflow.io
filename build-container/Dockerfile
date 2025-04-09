FROM node:18@sha256:df9fa4e0e39c9b97e30240b5bb1d99bdb861573a82002b2c52ac7d6b8d6d773e
RUN apt-get update && apt-get install -y python3 \
        python3-pip \
        jq \
        autoconf \
        automake \
        build-essential

RUN pip3 install --upgrade pip
RUN pip3 install --upgrade awscli
RUN wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip && unzip aws-sam-cli-linux-x86_64.zip -d sam-installation && ./sam-installation/install && sam --version
RUN rm -rf /var/lib/apt/lists/*

VOLUME /root/.aws
VOLUME /workdir
WORKDIR /workdir

RUN groupadd --gid 502 build \
  && useradd --uid 501 --gid build --shell /bin/bash --create-home build
