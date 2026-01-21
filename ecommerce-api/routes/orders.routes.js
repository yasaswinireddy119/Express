import express from "express";
import { readDB, writeDB } from "../utils/db.js";

const router = express.Router();

/* 1️⃣ Create Order */
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const db = readDB();

  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const totalAmount = product.price * quantity;

  const order = {
    id: Date.now(),
    productId,
    quantity,
    totalAmount,
    status: "placed",
    createdAt: new Date().toISOString().split("T")[0]
  };

  product.stock -= quantity;
  db.orders.push(order);

  writeDB(db);
  res.status(201).json({ message: "Order placed", order });
});

/* 2️⃣ Get All Orders */
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.orders);
});

/* 3️⃣ Cancel Order */
router.delete("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const db = readDB();

  const order = db.orders.find(o => o.id == orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.status === "cancelled") {
    return res.status(400).json({ message: "Order already cancelled" });
  }

  const today = new Date().toISOString().split("T")[0];
  if (order.createdAt !== today) {
    return res.status(400).json({ message: "Cancellation window expired" });
  }

  order.status = "cancelled";

  const product = db.products.find(p => p.id === order.productId);
  product.stock += order.quantity;

  writeDB(db);
  res.json({ message: "Order cancelled", order });
});

/* 4️⃣ Change Order Status */
router.patch("/change-status/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const db = readDB();

  const order = db.orders.find(o => o.id == orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  const validFlow = ["placed", "shipped", "delivered"];
  const currentIndex = validFlow.indexOf(order.status);

  if (
    order.status === "cancelled" ||
    order.status === "delivered" ||
    validFlow[currentIndex + 1] !== status
  ) {
    return res.status(400).json({ message: "Invalid status transition" });
  }

  order.status = status;
  writeDB(db);

  res.json({ message: "Status updated", order });
});

export default router;
