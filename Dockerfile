# Comeco de etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e instala dependencias.

COPY package*.json ./
RUN npm install

# Copia o resto
COPY . .

# Define nome da aplicacao
ARG APP_NAME
RUN npm run build:$APP_NAME

# Etapa de construcao de imagem final para producao
FROM node:20-alpine

WORKDIR /app

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# Copiar os arquivos de definicao de pacotes do builder
COPY --from=builder /app/package*.json ./

# Instalar so as dependencias de produção
RUN npm ci --omit=dev

# Copie o codigo compilado da aplicacao definida por APP_NAME
COPY --from=builder /app/dist/${APP_NAME} ./dist/${APP_NAME}

EXPOSE 3000


CMD node dist/${APP_NAME}/src/main.js


