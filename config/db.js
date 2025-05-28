import mysql2 from "mysql2/promise";
import { readFileSync } from "fs";
import { resolve } from "path";
import { cwd } from "process";

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: readFileSync(resolve(cwd(), "kingtonytech.pem")),
  },
});

export default pool;
