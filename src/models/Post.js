const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  content:  String, // String is shorthand for {type: String}
  image: String,
  author:   String,
  reactions: BigInt,
  comments: String
});

module.exports = mongoose.model("User", userSchema);