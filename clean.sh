# Arrêter et supprimer les conteneurs
docker-compose down

# Supprimer les volumes non utilisés
docker volume prune -f

# Supprimer les images non utilisées
docker image prune -f

# Afficher les conteneurs et images restants
docker ps -a
docker images