FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npx prisma generate 

RUN npm run build:backend

CMD [ "node", "dist/main.js" ]