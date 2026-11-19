# Cloud-Based Task Management Application

A full-stack task management application designed to help users create, manage, update, and track their daily tasks. This project is being developed step by step with a focus on backend development, database integration, frontend development, containerization, and cloud deployment.

## Project Overview

The Cloud-Based Task Management Application provides a REST API and a React-based user interface for managing tasks. The backend is built with Node.js and Express.js, while MySQL is used for persistent data storage.

The application allows users to create, view, edit, delete, and update the status of their tasks through an interactive web interface.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MySQL 8.0 |
| Database Driver | mysql2 |
| Containerization | Docker, Docker Compose |
| API | REST API |
| Development Tools | VS Code, Git, GitHub |
| API Testing | PowerShell Invoke-RestMethod |

## Project Structure

```text
cloud-task-management-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── server.js
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── Dockerfile
│   └── package.json
│
├── docs/
│   ├── API-DOCUMENTATION.md
│   └── DATABASE-DOCUMENTATION.md
│
├── docker-compose.yml
├── .env
├── .gitignore
└── README.md
```

## Completed Features

### 1. Project Setup

- Created the project directory and GitHub repository.
- Initialized Git for version control.
- Organized the project into backend, frontend, and documentation directories.
- Configured `.gitignore` and environment variable example files.

### 2. Backend Development

- Built a REST API using Node.js and Express.js.
- Configured environment variables using dotenv.
- Enabled CORS for frontend-backend communication.
- Implemented task CRUD endpoints.
- Added API health-check functionality.

### 3. MySQL Database Integration

- Installed and configured MySQL Server 8.0.
- Created the `task_management_db` database.
- Created the `tasks` table.
- Integrated MySQL using the `mysql2` package and connection pooling.
- Configured database credentials through environment variables.
- Verified database connectivity and task data operations.

### 4. Frontend Development

- Set up React.js using Vite.
- Built the TaskFlow user interface.
- Added a task creation form.
- Implemented the task listing interface.
- Added task editing and deletion functionality.
- Added task status update functionality.
- Created responsive styling for the application.

### 5. Frontend–Backend Integration Testing

- Connected the React frontend with the Express.js REST API.
- Integrated frontend task operations with the MySQL database.
- Verified task creation and retrieval.
- Tested task editing functionality.
- Tested task status updates.
- Verified task deletion functionality.
- Fixed API response handling to display database records correctly.
- Confirmed successful communication between frontend, backend, and MySQL.

**Integration Testing Result:** All CRUD operations successfully tested.

### 6. Dockerization

- Created a Dockerfile for the Node.js backend.
- Created a Dockerfile for the React frontend.
- Configured Docker Compose to orchestrate frontend, backend, and MySQL services.
- Configured environment variables for containerized services.
- Implemented persistent MySQL storage using Docker volumes.
- Configured Docker networking for inter-container communication.
- Built frontend and backend Docker images.
- Started all three services using Docker Compose.
- Created the MySQL tasks table inside the Docker database.
- Verified frontend and backend connectivity through Docker.
- Tested task CRUD operations in the containerized environment.

**Dockerization Result:** Frontend, backend, and MySQL successfully running as Docker Compose services.

### 7. Documentation

- Created API documentation.
- Created database documentation.
- Documented project structure, technology stack, and setup instructions.

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check API and database health |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a specific task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Database Schema

**Database:** `task_management_db`

**Table:** `tasks`

| Column | Data Type | Description |
|---|---|---|
| id | VARCHAR(36) | Primary key |
| title | VARCHAR(255) | Task title |
| description | TEXT | Task description |
| status | ENUM | pending, in-progress, completed |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Docker Architecture

The application uses Docker Compose to manage three services:

| Service | Technology | Port |
|---|---|---|
| Frontend | React + Vite | 5173 |
| Backend | Node.js + Express.js | 5000 |
| Database | MySQL 8.0 | 3306 (container), 3307 (host) |

### Docker Commands

Build Docker images:

```bash
docker compose build
```

Start all services:

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

View container logs:

```bash
docker compose logs
```

Stop all services:

```bash
docker compose down
```

**Note:** MySQL data is persisted using a Docker named volume. The database table must be initialized before using the application with a fresh database volume.

## Local Development Setup

### Prerequisites

- Node.js and npm
- MySQL Server 8.0+
- Git
- Docker Desktop

### Backend Setup

```bash
cd backend
npm install
```

Configure `backend/.env`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_management_db
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

`http://localhost:5173`

Backend API URL:

`http://localhost:5000`

## Project Roadmap

- [x] Project initialization and GitHub setup
- [x] Node.js and Express.js REST API
- [x] MySQL database integration
- [x] React and Vite frontend setup
- [x] Task management UI
- [x] Frontend-backend integration testing
- [x] Dockerize frontend, backend, and database services
- [ ] Configure AWS account and IAM
- [ ] Configure AWS networking and VPC
- [ ] Provision AWS EC2 infrastructure
- [ ] Configure AWS RDS MySQL
- [ ] Integrate AWS S3
- [ ] Implement application security and secrets management
- [ ] Deploy the application on AWS
- [ ] Configure domain and HTTPS
- [ ] Configure CloudWatch monitoring
- [ ] Complete final testing and production documentation

## Project Status

**Development in Progress**

The backend REST API, MySQL database integration, React frontend, frontend-backend integration testing, and Docker containerization have been completed.

The next milestone is AWS account and IAM configuration, followed by cloud infrastructure setup, deployment, and monitoring.

## Author

**Tahsinul Hoque Siddiki**

GitHub: [https://github.com/tahsinulhoque](https://github.com/tahsinulhoque)