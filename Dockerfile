FROM node:lts@sha256:aa648b387728c25f81ff811799bbf8de39df66d7e2d9b3ab55cc6300cb9175d9

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
