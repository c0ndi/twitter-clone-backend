FROM node:16-alpine

WORKDIR ./

COPY . .

RUN npm install

CMD ["node", "app.js"]

EXPOSE 8080