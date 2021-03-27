FROM node:alpine3.10

WORKDIR /api

COPY package*.json process.yml ./

RUN npm ci

COPY . .

EXPOSE 3000

ENTRYPOINT ["./node_modules/pm2/bin/pm2-runtime", "./src/app.js"]