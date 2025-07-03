FROM node:18@sha256:c6ae79e38498325db67193d391e6ec1d224d96c693a8a4d943498556716d3783
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
