# Use an official node image as the base image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the React app
CMD ["npm", "run", "dev"]
