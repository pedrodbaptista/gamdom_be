FROM node:22.5.1-alpine3.19 AS base

WORKDIR /app
COPY . .

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "dev" ]