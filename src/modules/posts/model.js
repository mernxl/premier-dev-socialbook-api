const mongoose = require('mongoose');
const { PostSchema } = require('./schema');

const PostModel = mongoose.model('Post', PostSchema);

module.exports.PostModel = PostModel;
