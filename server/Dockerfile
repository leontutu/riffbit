FROM node:20-alpine

WORKDIR /usr/src/app

COPY shared ./shared

WORKDIR /usr/src/app/server

COPY server/package*.json ./

RUN npm install

COPY server ./

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.cjs"]