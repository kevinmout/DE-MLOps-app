# DE-MLOps-app

## DO NOT USE NPM!

## Commands

After cloning install packages:

```
yarn install
```

To start the application:

```
yarn start
```

## Docker

Edit the .env.production

```
docker build -f Dockerfile -t my-first-image:latest .
```

```
docker run -it -p 3000:3000 --rm my-first-image:latest
```
