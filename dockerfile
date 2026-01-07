FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./server.js  

RUN npm ci --omit=dev --no-audit --no-fund

EXPOSE 3000
CMD ["node", "server.js"]
