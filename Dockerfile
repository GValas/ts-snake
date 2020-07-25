FROM node:10

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package*.json ./

# Install all Packages
RUN npm install 

# Copy all other source code to work directory
COPY . .

# RUN npm run browser-build

# Start
EXPOSE 1234
CMD [ "npm", "run", "browser-serve" ]