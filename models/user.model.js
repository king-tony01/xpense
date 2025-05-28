import bcrypt from "bcrypt";
import pool from "../config/db.js";

export default class User {
  static async create({ username, user_password }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user_password, salt);
      const [result] = await conn.query(
        "INSERT INTO users (username, user_password) VALUES (?, ?)",
        [username, hashedPassword]
      );
      await conn.commit();
      return { id: result.insertId, username };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async getByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0] || null;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  }
}
