
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
// MySQL integration will be done in Step 3.
let tasks = [];

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running",
    environment: process.env.NODE_ENV,
  });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// Get single task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// Create task
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required",
    });
  }

  const newTask = {
    id: randomUUID(),
    title: title.trim(),
    description: description || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
});

// Update task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const { title, description, status } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid task title",
      });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (status !== undefined) {
    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }
    task.status = status;
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex(
    (t) => t.id === req.params.id
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
