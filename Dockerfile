FROM node:lts@sha256:3218f0d1b9e4b63def322e9ae362d581fbeac1ef21b51fc502ef91386667ce92

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
