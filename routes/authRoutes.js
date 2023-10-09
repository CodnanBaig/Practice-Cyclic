const { signup, signin } = require("../controllers/authController");

const authRoutes = require("express").Router();

authRoutes.post("/signup", signup);

authRoutes.post("/signin", signin);

module.exports = authRoutes;