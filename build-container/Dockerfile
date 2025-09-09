FROM node:22@sha256:3266bc9e8bee1acc8a77386eefaf574987d2729b8c5ec35b0dbd6ddbc40b0ce2
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
