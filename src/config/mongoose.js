const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

mongoose.connect(uri, { dbName: 'sb-backend' }, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('DB Connected');
});

module.exports.defaulthConnection = mongoose.connection;
