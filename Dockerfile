# official Node.js image parent image
FROM node:18

# working directory
WORKDIR /express-rest-api

# Copy all local files into the image
COPY . .

# Install all dependencies
RUN npm install

# Define the command to run the app
CMD ["node", "index.js"]

# Expose the port the app runs in
EXPOSE 8080