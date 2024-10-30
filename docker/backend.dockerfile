# Utilisation de l'image Node.js Alpine avec la version spécifiée
ARG NODE_VERSION=18.20.2
FROM node:${NODE_VERSION}-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /usr/src/app



# Copie des fichiers de configuration de package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances, en utilisant un cache pour accélérer les builds ultérieures
RUN npm ci 


# Copie des autres fichiers source dans le conteneur
COPY . .

# Exposition du port utilisé par l'application
EXPOSE 3000

# Définition de l'utilisateur non-root pour exécuter l'application
USER node

# Commande pour démarrer l'application
CMD npm run dev