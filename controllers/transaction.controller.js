import Transaction from "../models/transaction.model.js";

export const getTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;
    const transactions = await Transaction.getAllByUser(user_id);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { type, amount, category, description } = req.body;
    const newTransaction = await Transaction.create({
      type,
      amount,
      category,
      description,
      user_id,
    });
    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    await Transaction.delete(id, user_id);
    res.status(200).json({ success: true, message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const user_id = req.user.id;
    const summary = await Transaction.getSummary(user_id);
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
