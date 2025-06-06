# Etapa 1: build da aplicação
FROM node:18 AS builder

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Define o nome da aplicação a ser construída
ARG APP_NAME
RUN npm run build:$APP_NAME

# Etapa 2: imagem final para produção
FROM node:18-alpine

WORKDIR /app

# Copia somente arquivos necessários
COPY package*.json ./
RUN npm install --omit=dev

ARG APP_NAME
COPY --from=builder /app/dist/apps/${APP_NAME} ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
