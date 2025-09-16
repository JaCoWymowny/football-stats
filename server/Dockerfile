# Używamy Node 20
FROM node:20.18.0

# katalog roboczy
WORKDIR /app

# kopiujemy package.json i package-lock.json
COPY package*.json ./

# instalujemy wszystkie zależności (łącznie z dev – bo potrzebne do builda)
RUN npm ci

# kopiujemy resztę kodu
COPY . .

# generujemy klienta Prisma
RUN npx prisma generate

# budujemy TypeScript -> dist/
RUN npm run build

# ustawiamy zmienne środowiskowe
ENV NODE_ENV=production
EXPOSE 3009

# uruchamiamy gotowy build
CMD ["npm", "run", "serve"]
