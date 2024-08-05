FROM node:18

# Créez un répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

RUN npm install -g nodemon

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application
RUN npm run build

# Exposez le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start:dev"]

