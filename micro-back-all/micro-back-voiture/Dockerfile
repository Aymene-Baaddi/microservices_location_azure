# Dockerfile pour un microservice Spring Boot

# Étape 1 : Utiliser une image de base appropriée pour Java
FROM eclipse-temurin:21-jdk-alpine

# Étape 2 : Ajouter un argument pour le fichier JAR
ARG JAR_FILE=target/*.jar

# Étape 3 : Copier le fichier JAR dans l'image Docker
COPY ${JAR_FILE} app.jar

# Étape 4 : Exposer le port sur lequel l'application Spring Boot fonctionne
EXPOSE 8085

# Étape 5 : Démarrer l'application
ENTRYPOINT ["java", "-jar", "/app.jar"]
