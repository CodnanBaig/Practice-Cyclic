const Todo = require("../models/todoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(201).json(todos);
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.postTodo = async (req, res) => {
  const body = req.body;
  console.log(body, req);
  try {
    const new_todo = await Todo.create({ ...body, userId: req.user.id });
    return res.status(201).json(new_todo);
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_todo = await Todo.findByIdAndRemove(id);
    res.send("Todo deleted");
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updated_todo = await Todo.findByIdAndUpdate(id, body);
    return res.status(201).json(updated_todo);
  } catch (error) {
    return res.status(404).json(error);
  }
};
