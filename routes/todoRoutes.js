const { getTodos, postTodo, deleteTodo, updateTodo } = require("../controllers/todoController");
const verifyToken = require("../middlewares/verifyToken");

const todoRoutes = require("express").Router();

todoRoutes.get("/todos", getTodos);
todoRoutes.post("/todos", verifyToken, postTodo);
todoRoutes.delete("/todos/:id", verifyToken, deleteTodo);
todoRoutes.put("/todos/:id", verifyToken, updateTodo)

module.exports = todoRoutes;