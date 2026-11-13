
# Database Documentation

## 1. Database Overview

Database: task_management_db
DBMS: MySQL 8.0.46

## 2. Database Configuration

- Host: 127.0.0.1
- Port: 3306
- Database: task_management_db
- Connection: mysql2/promise
- Connection Pool: Enabled

## 3. Table Structure

Table: tasks

| Column | Data Type | Description |
|---|---|---|
| id | VARCHAR(36) | Primary Key |
| title | VARCHAR(255) | Task Title |
| description | TEXT | Task Description |
| status | ENUM | Task Status |
| created_at | TIMESTAMP | Creation Time |
| updated_at | TIMESTAMP | Last Update Time |

## 4. Task Status

- pending
- in-progress
- completed

## 5. Database Integration

The Node.js Express backend connects
to MySQL using the mysql2 package.

A connection pool manages database
connections efficiently.

## 6. Database Verification

Verified operations:

- INSERT
- SELECT
- UPDATE
- DELETE

All CRUD operations were tested
successfully through REST APIs.

## 7. Security

Database credentials are stored
in environment variables.

The .env file is excluded from GitHub.
