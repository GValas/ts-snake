FROM node:11-alpine

# Create Directory for the Container
WORKDIR /app

# Only copy the package.json file to work directory
COPY ./package*.json ./

# Install all Packages
RUN npm install 

# Copy all other source code to work directory
COPY . .

# Expose port 
EXPOSE 80

# Final command
# CMD [ "npm", "run", "browser-serve" ]