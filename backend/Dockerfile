    FROM maven:latest as builder
    WORKDIR /opt/app
    COPY mvnw pom.xml ./
    COPY ./src ./src
    RUN mvn clean install -DskipTests

    FROM eclipse-temurin:21-jre-jammy
    WORKDIR /opt/app
    EXPOSE 8080
    COPY --from=builder /opt/app/target/*.jar /opt/app/*.jar
    ENTRYPOINT ["java", "-jar", "/opt/app/*.jar"]

    FROM python:3.10-alpine
    WORKDIR /python
    ENV FLASK_APP = app.py
    COPY ./src/main/python/requirements.txt requirements.txt
    RUN pip install -r requirements.txt 
    EXPOSE 6060
    COPY ./src/main/python /python
    CMD ["python3", "app.py"]