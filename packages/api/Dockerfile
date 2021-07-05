FROM node:12.15.0-alpine as preparation

WORKDIR /app
COPY ./package.json .

# Create temporary package.json where version is set to 0.0.0
# – this way the cache of the build step won't be invalidated
# if only the version changed.

RUN ["node", "-e", "\
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));\
fs.writeFileSync('package.json', JSON.stringify({ ...pkg, version: '0.0.0' }));\
"]

FROM node:12.15.0-alpine as builder

ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG

WORKDIR /app
COPY --from=preparation /app/package.json  .
RUN yarn
ENV NODE_ENV production
COPY . .
RUN yarn build --docker
RUN yarn

FROM node:12.15.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/build  .
COPY ./newrelic.js  ./newrelic.js
COPY ./package.json ./

USER node

CMD ["node", "main.js"]
