import pool from "../config/db.js";

export default class Transaction {
  static async getAllByUser(user_id) {
    const [rows] = await pool.query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
    return rows;
  }
  static async getByID(id) {
    const [rows] = await pool.query("SELECT * FROM transactions WHERE id = ?", [
      id,
    ]);
    return rows;
  }

  static async create({ type, amount, category, description, user_id }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [result] = await conn.query(
        "INSERT INTO transactions (transaction_type, amount, category, transaction_description, user_id) VALUES (?, ?, ?, ?, ?)",
        [type, amount, category, description, user_id]
      );
      await conn.commit();
      return {
        id: result.insertId,
        type,
        amount,
        category,
        description,
        user_id,
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async delete(id, user_id) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(
        "DELETE FROM transactions WHERE id = ? AND user_id = ?",
        [id, user_id]
      );
      await conn.commit();
      return { id };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async getSummary(user_id) {
    const [incomeRows] = await pool.query(
      "SELECT SUM(amount) AS total_income FROM transactions WHERE user_id = ? AND transaction_type = 'income'",
      [user_id]
    );
    const [expenseRows] = await pool.query(
      "SELECT SUM(amount) AS total_expense FROM transactions WHERE user_id = ? AND transaction_type = 'expense'",
      [user_id]
    );

    const total_income = incomeRows[0].total_income || 0;
    const total_expense = expenseRows[0].total_expense || 0;
    const balance = total_income - total_expense;

    return { total_income, total_expense, balance };
  }
}
