const faker = require('faker');

const { UsersC, PostsC, client } = require('./src/db');

// know if this was called from command line directly
const isDirectCall = process.argv[ 1 ].endsWith('import-data.js');
const count = Number(process.argv[ 2 ] || isDirectCall ? 10 : 2); // add just 2 if not directCall

const importData = async () => {
  // create 10 random users
  const users = Array(count).fill(null).map(() => ({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),
  }));

  // insert new users into db
  await UsersC.insertMany(users);

  const posts = Array(count).fill(null).map(() => ({
    content: faker.lorem.sentence(),
    createdAt: faker.date.past(),
  }));

  // insert new users into db
  await PostsC.insertMany(posts);
};

importData()
  .then(() => {
    // kill the server if its a direct call
    if (isDirectCall) {
      return client.close();
    }
  })
  .then(() => {
    console.log(`Done Importing dummy data(${count})`);
  });
