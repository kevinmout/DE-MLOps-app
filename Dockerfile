# start
# build: docker build -f Dockerfile -t my-first-image:latest .
# run: docker run -it -p 80:80 --rm my-first-image:latest

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

CMD ["yarn","serve","-s" ,"build", "-l","80"]
EXPOSE 80
