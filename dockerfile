# Imagem
FROM node:20-alpine

# Diretório de trabalho do container
WORKDIR /app

# Copia e instala dependências
COPY package.json package-lock.json ./
RUN npm install

# copia o restante do código
COPY . .

# abre a porta 3000
EXPOSE 3000

# Comando para iniciar
CMD [ "node", "index.js" ]

