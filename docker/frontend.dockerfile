# Utilise l'image Node.js comme base pour construire l'application
FROM node:18 AS build-stage

# Crée un dossier pour l'application
WORKDIR /app

# Copie les fichiers de package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Exécute la commande de build
RUN npm run build

# Étape de production : Serveur Nginx pour servir l'application
FROM nginx:alpine AS production-stage

# Copie les fichiers build dans le dossier nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose le port 80 pour le serveur Nginx
EXPOSE 80

# Lance Nginx en mode premier plan
CMD ["nginx", "-g", "daemon off;"]
