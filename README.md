# DE-MLOps-app

## DO NOT USE NPM!

## Commands
After cloning, install packages:
```
yarn install
```

Set environment variables:

1. Please copy contents of .env.example.
2. Create a new file called .env
3. Check the url of your API.
4. Replace this in .env.


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
