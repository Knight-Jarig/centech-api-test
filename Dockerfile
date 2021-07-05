FROM node:14.15.4-alpine3.12 as builder

ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG

# RUN apk --no-cache add git

WORKDIR /app
COPY ./packages/api/package.json ./yarn.lock ./
RUN yarn

ENV NODE_ENV production
COPY ./packages/api/codegen.yml ./packages/api/tsconfig.json ./packages/api/webpack.config.js ./
COPY ./packages/api/src ./src
# COPY .git .git
RUN yarn build --docker

#Clean devDependencies in node_modules
RUN yarn

FROM node:14.15.4-alpine3.12

WORKDIR /usr/src/app

RUN apk upgrade -U -a

ENV NODE_ENV production
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/build  .
COPY ./packages/api/newrelic.js  ./newrelic.js
RUN apk --no-cache add curl

USER node

CMD ["node", "main.js"]
