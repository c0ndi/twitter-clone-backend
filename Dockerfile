# Fetching the minified node image on apline linux
FROM node:16-alpine

# Setting up the work directory
WORKDIR ./

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD ["node", "app.js"]

# Exposing server port
EXPOSE 8080