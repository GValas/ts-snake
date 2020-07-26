FROM node:11-alpine

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY ./package*.json ./

# Install all Packages
RUN npm install 

# Copy all other source code to work directory
COPY . .

# RUN npm run browser-build

# Expose port
ARG APP_PORT
EXPOSE $APP_PORT

# Final command
CMD [ "npm", "run", "browser-serve" ]