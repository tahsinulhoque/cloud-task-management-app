
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import pool from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running",
    database: "MySQL",
    environment: process.env.NODE_ENV,
  });
});

// Get All Tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const [tasks] = await pool.execute(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
    });
  }
});

// Get Single Task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const [tasks] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tasks[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve task",
    });
  }
});

// Create Task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const id = randomUUID();

    await pool.execute(
      `INSERT INTO tasks (id, title, description)
       VALUES (?, ?, ?)`,
      [id, title.trim(), description || ""]
    );

    const [tasks] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: tasks[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
});

// Update Task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const [existing] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (
      title !== undefined &&
      (typeof title !== "string" || !title.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid task title",
      });
    }

    if (
      status !== undefined &&
      !["pending", "in-progress", "completed"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push("title = ?");
      values.push(title.trim());
    }

    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }

    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    values.push(req.params.id);

    await pool.execute(
      `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    const [updated] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updated[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
});

// Delete Task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const [result] = await pool.execute(
      "DELETE FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log("Database: MySQL");
});
