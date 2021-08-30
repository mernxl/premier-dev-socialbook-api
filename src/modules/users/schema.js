const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  username: String,
}, {
  timestamps: true
})

module.exports.UserSchema = UserSchema
