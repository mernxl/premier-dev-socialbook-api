const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const initialize = async () => {
  try {
    await client.connect(); // connect to our mongo db instance
  } catch (e) {
    console.error(e);
    process.exit(1); // will kill the application in case of error
  }
};

const database = client.db('sb-backend');

// initialize collections
let PostsC = database.collection('posts');
let UsersC = database.collection('users');

// initialize and connect our db
initialize()
  .then(() => {
    console.log('db initialized')
  })

module.exports = { client, db: database, PostsC, UsersC };
