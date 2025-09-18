FROM node:20-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm ci --omit=dev

COPY . .

# Build TS -> JS
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/server.js"]