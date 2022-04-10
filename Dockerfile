FROM node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN nest install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]