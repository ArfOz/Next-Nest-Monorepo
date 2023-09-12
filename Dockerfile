FROM node:16.14.0-alpine
WORKDIR /apps
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run database:generate
COPY . .
RUN npm run build:backend
CMD [ "npm", "run", "start:backend" ]