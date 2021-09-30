const mongoose = require("mongoose");
// const User = require('./User');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.types.ObjectId,
    ref: "User"
  },
  body: {
    type: String
  },
  reactions: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);