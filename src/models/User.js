const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  String, // String is shorthand for {type: String}
  username: String,
  email:   String,
  password: String,
  avatar: String
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);