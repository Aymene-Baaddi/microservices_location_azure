# Étape 1 : Utiliser une image Maven pour construire l'application
FROM maven:3.8.5-openjdk-17 AS build

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Copier le fichier pom.xml et les fichiers sources dans l'image
COPY pom.xml .
COPY src ./src

# Télécharger les dépendances et construire l'application
RUN mvn clean package -DskipTests

# Étape 2 : Utiliser une image OpenJDK pour exécuter l'application
FROM eclipse-temurin:17-jdk-alpine

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Copier le fichier JAR généré à partir de l'étape de build dans l'image
COPY --from=build /app/target/*.jar app.jar

# Exposer le port sur lequel l'application Spring Boot fonctionne
EXPOSE 8080

# Définir la commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
