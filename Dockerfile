FROM alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add yarn
RUN yarn install --only=development

COPY . .
RUN yarn run build

FROM alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json yarn.lock ./
RUN apk add yarn
RUN yarn install --only=production

COPY --from=builder /app/build ./build

RUN yarn global add serve

CMD ["serve","-s","build","-l","3000"]

EXPOSE 3000
