FROM node:lts@sha256:6fe286835c595e53cdafc4889e9eff903dd3008a3050c1675809148d8e0df805

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN yarn install

CMD ["yarn", "start"]
