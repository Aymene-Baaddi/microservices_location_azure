# Utilise l'image officielle de Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3001

# Démarrer l'application
CMD ["npm", "start"]
