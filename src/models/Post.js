const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content:  String, // String is shorthand for {type: String}
  image: String, // stores __dir of the image
  author: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
  reactions: {
    type: Number,
    default: 0
  },
  comments: [{
    user: String,
    body: String,
    updated: {
      type: Date, default: Date.now
    }
  }]
});

module.exports = mongoose.model("Post", postSchema);