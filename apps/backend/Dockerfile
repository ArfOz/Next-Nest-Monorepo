FROM node:16-alpine as development

WORKDIR /usr

COPY package*.json ./

COPY . .
RUN npm install

RUN npm run database:generate 

RUN npm run build:backend

CMD [ "node", "dist/apps/backend/main.js" ]