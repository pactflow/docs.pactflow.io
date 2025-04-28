FROM node:lts@sha256:473b4362b26d05e157f8470a1f0686cab6a62d1bd2e59774079ddf6fecd8e37e

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
