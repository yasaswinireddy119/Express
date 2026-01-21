import express from "express";
import { readDB, writeDB } from "../utils/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const db = readDB();
  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({ message: "Product added", product: newProduct });
});

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

export default router;
