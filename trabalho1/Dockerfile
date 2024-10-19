FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./

RUN npm install

COPY . .

# API Port and Prisma Port
EXPOSE 3000 5555

CMD ["npm", "run", "start:dev"]
