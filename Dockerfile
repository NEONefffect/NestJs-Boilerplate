FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build
###

FROM node:18-alpine

WORKDIR /usr/src/app     

COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/yarn.lock ./

RUN yarn install --production

CMD yarn start:prod