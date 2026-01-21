import fs from "fs";

const DB_PATH = "./data/db.json";

export const readTodos = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

export const writeTodos = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};
