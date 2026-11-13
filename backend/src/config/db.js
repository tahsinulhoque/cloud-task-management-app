
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testDatabaseConnection() {
  let connection;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query(
      "SELECT DATABASE() AS database_name"
    );

    console.log("MySQL connected successfully!");
    console.log("Database:", rows[0].database_name);
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    throw error;
  } finally {
    connection?.release();
  }
}

export default pool;
