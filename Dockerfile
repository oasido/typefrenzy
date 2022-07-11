FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock next.config.js .env.local tsconfig.json ./
RUN yarn install

CMD ["yarn", "dev"]