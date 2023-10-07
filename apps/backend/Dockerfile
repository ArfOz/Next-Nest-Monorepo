FROM node:16-alpine as development

WORKDIR /backend

COPY package*.json ./

COPY . .

RUN npm install --force

RUN npm run database:generate 

RUN npm run build:backend

EXPOSE 3300

CMD [ "node", "dist/apps/backend/main.js" ]