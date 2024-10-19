FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma/* ./prisma/

RUN npm install

COPY . .

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# API Port and Prisma Port
EXPOSE 3000 5555

CMD ["npm", "run", "start:dev"]
