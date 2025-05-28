import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, createTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);
router.get("/summary", authMiddleware, getSummary);

export default router;
