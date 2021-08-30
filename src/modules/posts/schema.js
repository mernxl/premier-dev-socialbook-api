const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  content: String,
  imageUrl: String,
}, {
  timestamps: true
})

module.exports.PostSchema = PostSchema
