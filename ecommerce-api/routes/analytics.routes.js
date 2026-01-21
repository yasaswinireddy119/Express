import express from "express";
import { readDB } from "../utils/db.js";

const router = express.Router();

/* 1️⃣ All Orders */
router.get("/allorders", (req, res) => {
  const { orders } = readDB();
  res.json({ count: orders.length, orders });
});

/* 2️⃣ Cancelled Orders */
router.get("/cancelled-orders", (req, res) => {
  const cancelled = readDB().orders.filter(o => o.status === "cancelled");
  res.json({ count: cancelled.length, orders: cancelled });
});

/* 3️⃣ Shipped Orders */
router.get("/shipped", (req, res) => {
  const shipped = readDB().orders.filter(o => o.status === "shipped");
  res.json({ count: shipped.length, orders: shipped });
});

/* 4️⃣ Total Revenue by Product */
router.get("/total-revenue/:productId", (req, res) => {
  const { productId } = req.params;
  const db = readDB();

  const product = db.products.find(p => p.id == productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const totalRevenue = db.orders
    .filter(o => o.productId == productId && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId, totalRevenue });
});

/* 5️⃣ Overall Revenue */
router.get("/alltotalrevenue", (req, res) => {
  const db = readDB();

  const totalRevenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId);
      return sum + o.quantity * product.price;
    }, 0);

  res.json({ totalRevenue });
});

export default router;
