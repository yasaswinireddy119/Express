1import { readTodos, writeTodos } from "../models/todo.model.js";

// GET all todos
export const getTodos = (req, res) => {
  try {
    const data = readTodos();
    res.status(200).json(data.todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// POST add todo
export const addTodo = (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const data = readTodos();

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    data.todos.push(newTodo);
    writeTodos(data);

    res.status(201).json({
      message: "Todo added successfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add todo" });
  }
};

// PUT update todo
export const updateTodo = (req, res) => {
  try {
    const { id, title, completed } = req.body;

    const data = readTodos();
    const index = data.todos.findIndex((t) => t.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    data.todos[index] = {
      ...data.todos[index],
      title: title ?? data.todos[index].title,
      completed: completed ?? data.todos[index].completed,
    };

    writeTodos(data);

    res.status(200).json({
      message: "Todo updated successfully",
      todo: data.todos[index],
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

// DELETE todo
export const deleteTodo = (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = readTodos();

    const exists = data.todos.some((t) => t.id === id);
    if (!exists) {
      return res.status(404).json({ message: "Todo not found" });
    }

    data.todos = data.todos.filter((t) => t.id !== id);
    writeTodos(data);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
