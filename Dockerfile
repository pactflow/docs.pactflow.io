FROM node:lts@sha256:37ff334612f77d8f999c10af8797727b731629c26f2e83caa6af390998bdc49c

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
