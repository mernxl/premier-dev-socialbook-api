const mongoose = require('mongoose');
const { UserSchema } = require('./users/schema');

const UserMethods = require('./users/methods')

UserSchema.methods = UserMethods;
const UserModel = mongoose.model('User', UserSchema);

module.exports.UserModel = UserModel;
