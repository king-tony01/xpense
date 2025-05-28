import "./config/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import transactionRoutes from "./routes/transaction.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Xpense API is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Xpense server running on port ${PORT}`);
});
