const bcrypt = require('bcrypt')

const UserMethods = {
  // compare user password method
  comparePassword(testPwd) {
    return bcrypt.compare(testPwd, this.password)
  }
}

module.exports = UserMethods;
