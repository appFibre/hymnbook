# Use Node.js base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code, but exclude node_modules
COPY . . 

# Install necessary system dependencies
RUN apt-get update && apt-get install -y curl libcap2-bin fonts-dejavu fontconfig && rm -rf /var/lib/apt/lists/*

# Expose the application's port
EXPOSE 9802

# Start the application
CMD ["node", "./server.js"]
