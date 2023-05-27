# Base image with Temurin JDK 17
FROM eclipse-temurin:17-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the Gradle wrapper files
COPY gradlew .
COPY gradle gradle

# Copy the build files
COPY build.gradle .
COPY settings.gradle .
COPY src src

# Build the project
RUN chmod +x gradlew
RUN ./gradlew build

# Expose the port that the Spring Boot application will run on
EXPOSE 8080

# Set the entry point for the container
ENTRYPOINT ["java", "-jar", "build/libs/demo-0.0.1-SNAPSHOT.jar"]
