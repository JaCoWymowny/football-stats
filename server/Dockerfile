FROM node:20.18.0-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# =========================
# Stage 2: Runtime
# =========================
FROM node:20.18.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit --no-fund \
  && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

ENV NODE_ENV=production
ENV PORT=3009

EXPOSE 3009
CMD ["node", "dist/app.js"]
