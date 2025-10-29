FROM node:lts@sha256:34af25027ee1b8bffd482ba995ec1e577fbd398db87beb4c60b80c2c9c025127

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
