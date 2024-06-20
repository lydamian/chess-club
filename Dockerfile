# Use the official Node.js 16 image as a base
FROM node:20.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose the listening port
EXPOSE 5173

# Expose vite's HMR port
EXPOSE 24678


# Run the app
CMD [ "npm", "run", "dev", "--", "--host" ]