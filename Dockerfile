# Stage 1: Build the application
FROM maven:3.9.8-amazoncorretto-17-al2023 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:24-slim-bullseye
WORKDIR /app
COPY --from=build /app/target/spring-docker.jar spring-docker.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "spring-docker.jar"]
