
# Usar a imagem oficial do Node.js
FROM node:16

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos package*.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Build do projeto
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3000

# Rodar o comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
