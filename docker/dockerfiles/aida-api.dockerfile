# Start from the official Node.js LTS base image
FROM node:20.10

# Set the working directory
WORKDIR /anthon/

# Copy package.json and package-lock.json
COPY ../../services/anthon-api/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ../../services/anthon-api/ .

# Expose the application on port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]