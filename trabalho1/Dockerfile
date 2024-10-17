FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

CMD [ -d "node_modules" ] && npm run start:debug
