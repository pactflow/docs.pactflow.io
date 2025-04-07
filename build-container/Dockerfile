FROM node:18@sha256:3c56248510700ddb4861bd478ea2ced828793fd5388a21adc5270cdbbf7b7919
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
