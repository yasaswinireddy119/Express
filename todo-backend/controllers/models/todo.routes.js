import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
