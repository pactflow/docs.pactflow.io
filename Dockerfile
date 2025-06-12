FROM node:lts@sha256:71bcbb3b215b3fa84b5b167585675072f4c270855e37a599803f1a58141a0716

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
