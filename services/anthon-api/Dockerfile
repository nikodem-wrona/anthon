# Start from the official Node.js LTS base image
FROM node:20.10.0

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Generate the prisma client and the graphql schema
RUN npm run prisma:generate
RUN npm run graphql:generate

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]