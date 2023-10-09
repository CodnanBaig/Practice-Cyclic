const mongoose = require("mongoose");

const Todo = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    task: {type: String, required: true},
    status: {type: String, default: false}
})

module.exports = mongoose.model("Todo", Todo);