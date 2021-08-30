const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { required: true, type: String, },
  password: { type: String, required: String, }
}, {
  timestamps: true
});

// hook that will harsh the password before saving
UserSchema.pre('save', async function (next) {
  try {
    // only harsh on modification of password
    if (this.isModified('password')) {
      // generate a salt to use
      const salt = await bcrypt.genSalt(5);

      // replace the clear-text with harsh
      this.password = await bcrypt.hash(this.password, salt);
    }
  } catch (e) {
    return next(e);
  }

  return next();
});

module.exports.UserSchema = UserSchema;
