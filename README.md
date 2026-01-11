# Job Offer Engine

A Spring Boot application that evaluates and stores job offers using external economic data
(cost of living, inflation, career growth) and user-defined weighting.

## Tech Stack
- Java 21
- Spring Boot
- Spring Data JPA
- MySQL
- HTML / JavaScript frontend

## Features
- Submit job offers via web UI
- Normalize salary using cost-of-living data
- Persist offers per client
- REST API backend

## Running Locally
1. Create a MySQL database
2. Configure `application.yml`
3. Run the Spring Boot application
4. Visit `http://localhost:8080`
