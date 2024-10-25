# Use an Alpine image with Node.js and Yarn installed
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Install dependencies and build the React app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Install `serve` globally to serve the built React app
RUN yarn global add serve

# Expose port 3000 for serving the app
EXPOSE 3000

# Start the app using `serve`
CMD ["serve", "-s", "build", "-l", "3000"]
