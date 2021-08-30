const faker = require('faker');

// import mongoose to ensure connection
const { defaulthConnection } = require('./src/config/mongoose');

const { PostModel } = require('./src/modules/posts/model');
const { UserModel } = require('./src/modules/users/model');

// know if this was called from command line directly
const isDirectCall = process.argv[ 1 ].endsWith('import-data.js');
const count = Number(process.argv[ 2 ] || (isDirectCall ? 10 : 2)); // add just 2 if not directCall

const importData = async () => {
  // create count random users
  const users = Array(count).fill(null).map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
  }));

  // insert new users into db
  await UserModel.create(users);

  const posts = Array(count).fill(null).map(() => ({
    content: faker.lorem.sentence(),
  }));

  // insert new users into db
  await PostModel.create(posts);
};

importData()
  .then(() => {
    // kill the server if its a direct call
    if (isDirectCall) {
     return defaulthConnection.close();
    }
  })
  .then(() => {
    console.log(`Done Importing dummy data(${count})`);
  });
