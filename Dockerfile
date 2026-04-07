FROM openjdk:21-jdk-slim
WORKDIR /app
COPY . .
RUN chmod +X mvnw
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
CMD ["sh" , "-c" , "java -jar target/*.jar"]
