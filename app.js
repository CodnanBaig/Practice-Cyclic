const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);

mongoose
  .connect(`${process.env.DB_URL}eval-practice`)
  .then(() => app.listen(process.env.PORT))
  .then(() => console.log(`Connected and listening on ${process.env.PORT}`))
  .catch((err) => console.log(err));
