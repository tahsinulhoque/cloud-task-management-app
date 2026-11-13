
# Task Management API Documentation

## 1. Project Overview

This document describes the REST API endpoints
for the Cloud Task Management Application.

The backend is developed using Node.js and Express.js.

## 2. Technology Stack

- Node.js
- Express.js
- JavaScript
- REST API
- CORS
- dotenv

## 3. Server Configuration

Base URL:
http://localhost:5000

API Prefix:
/api

## 4. API Endpoints

### 4.1 Health Check

- Method: GET
- Endpoint: /api/health

Description:
Checks whether the backend server is running.

### 4.2 Get All Tasks

- Method: GET
- Endpoint: /api/tasks

Description:
Returns all available tasks.

### 4.3 Get Single Task

- Method: GET
- Endpoint: /api/tasks/:id

Description:
Returns a task using its unique ID.

### 4.4 Create Task

- Method: POST
- Endpoint: /api/tasks

Request Body:

{
  "title": "Learn AWS EC2",
  "description": "Deploy Node.js application on AWS"
}

Description:
Creates a new task.

### 4.5 Update Task

- Method: PUT
- Endpoint: /api/tasks/:id

Request Body:

{
  "title": "Learn AWS EC2",
  "description": "EC2 deployment completed",
  "status": "completed"
}

Allowed Status Values:
- pending
- in-progress
- completed

Description:
Updates an existing task.

### 4.6 Delete Task

- Method: DELETE
- Endpoint: /api/tasks/:id

Description:
Deletes a task using its unique ID.

## 5. HTTP Response Codes

- 200: Request successful
- 201: Resource created
- 400: Invalid request
- 404: Resource not found
- 500: Internal server error

## 6. Error Handling

The API returns JSON responses containing:
- success
- message

## 7. Environment Variables

PORT=5000
NODE_ENV=development

## 8. Run Backend Locally

Install dependencies:

npm install

Start development server:

npm run dev

Start production server:

npm start

## 9. Current Database Status

The application uses MySQL 8.0.46
for persistent task data storage.

Database: task_management_db
Table: tasks
Driver: mysql2

MySQL database integration will be
implemented in the next development phase.

## 10. Future Cloud Deployment

The application will be deployed using:

- AWS EC2
- AWS RDS MySQL
- AWS S3
- AWS VPC
- AWS IAM
- AWS CloudWatch
- Docker
