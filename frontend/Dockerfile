# Dockerfile ubicado en la carpeta 'frontend'

### ETAPA 1: CONSTRUIR LA APLICACIÓN ###
FROM node:22.19-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build frontend

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/ 

COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80