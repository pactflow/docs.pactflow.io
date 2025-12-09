FROM node:lts@sha256:9a2ed90cd91b1f3412affe080b62e69b057ba8661d9844e143a6bbd76a23260f

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
