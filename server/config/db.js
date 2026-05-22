require("dotenv").config();

const mysql = require("mysql2");

const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"];

const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error(`Database configuration missing required environment variables: ${missingEnvVars.join(", ")}`);
}

const useSsl = process.env.DB_SSL === "true" || process.env.NODE_ENV === "production";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  ssl: useSsl
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
});

pool.query("SELECT 1", (err) => {
  if (err) {
    console.error("Database Connection Failed");
    console.error(err);
    return;
  }

  console.log("Database Connected");
});

module.exports = pool;