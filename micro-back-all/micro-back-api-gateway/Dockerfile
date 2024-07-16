# Étape 1 : Construire l'application (à faire localement avant de construire l'image Docker)
# mvn clean package -DskipTests

# Étape 2 : Utiliser une image OpenJDK pour exécuter l'application
FROM eclipse-temurin:17-jdk-alpine

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Copier le fichier JAR généré dans l'image
COPY target/*.jar app.jar

# Exposer le port sur lequel l'application Spring Boot fonctionne
EXPOSE 8080

# Définir la commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
