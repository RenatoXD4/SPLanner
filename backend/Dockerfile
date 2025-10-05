# --- ETAPA 1: Builder ---
# Compila el código TypeScript a JavaScript
FROM node:22.19-alpine3.22 AS builder
WORKDIR /app

# Copiar primero los package.json para aprovechar el caché de Docker
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el resto del código (el .dockerignore evitará copiar archivos innecesarios)
COPY . .

# Generar el cliente de Prisma basado en tu schema.prisma
RUN npx prisma generate

# Compilar el código de TypeScript (ejecuta el script "build" de tu package.json)
RUN npm run build

# --- ETAPA 2: Producción ---
# Crea la imagen final y ligera para correr la aplicación
FROM node:22.19-alpine3.22
WORKDIR /app

# Copiar los package.json de nuevo
COPY package*.json ./

# Instalar SOLAMENTE las dependencias de producción
RUN npm install --omit=dev

# Copiar el JavaScript compilado y el cliente de Prisma desde la etapa 'builder'
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/src/prisma ./src/prisma

# Expone el puerto de tu aplicación Express (cámbialo si usas otro)
EXPOSE 3000

# AJUSTE: Tu punto de entrada es index.ts, por lo que el comando usa dist/index.js
CMD ["node", "dist/index.js"]