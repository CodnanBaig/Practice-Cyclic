const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne(id);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.signup = async (req, res) => {
  const body = req.body;
  try {
    const existing_user = await User.findOne({ email: body.email });
    if (existing_user) {
      return res.status(403).json({ message: "User Exists" });
    }
    const hash = await bcrypt.hash(body.password, 5);
    const new_user = await User.create({
      name: body.name,
      email: body.email,
      password: hash,
    });
    const token = jwt.sign({ id: new_user._id }, process.env.SECRET);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.signin = async (req, res) => {
  const body = req.body;
  try {
    const existing_user = await User.findOne({ email: body.email });
    if (!existing_user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const compare_hash = await bcrypt.compare(
      body.password,
      existing_user.password
    );
    if (!compare_hash) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: existing_user._id }, process.env.SECRET);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(404).json(error);
  }
};
