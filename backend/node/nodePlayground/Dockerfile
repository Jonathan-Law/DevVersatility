# Use a Node.js base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
# RUN npm ci --production

# Copy the server.js file and the static directory
COPY index.js .
COPY static ./static

# Expose the port that the Node.js server will listen on
EXPOSE 8080

# Set the entry point for the container
CMD [ "node", "index.js" ]
