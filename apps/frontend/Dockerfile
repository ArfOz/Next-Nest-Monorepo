# Install dependencies only when needed
FROM node:16-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY .npmrc package.json ./
RUN npm install --force

# # Production image, copy all the files and run next
# FROM node:16-alpine as runner
RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

# Copy installed dependencies from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy built application files
COPY ./ ./

RUN npm run build:frontend
# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000

WORKDIR /usr/src/app/dist/apps/frontend
# If you are using the custom server implementation:
# CMD ["dumb-init", "node", "server/main.js"]

# If you are using the NextJS built-int server:
CMD ["dumb-init", "npm", "start"]