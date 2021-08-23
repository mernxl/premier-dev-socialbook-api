const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectId;

/*
 * Adding right headers to responses
 * - Request Methods (GET and POST)
 *
 * - switch to express
 * - add mongodb
 */

// import the db, users, posts collections
const { UsersC, PostsC } = require('./db');

// import dummy data
require('../import-data');

// heruko sets a port on the PORT env var
const PORT = process.env.PORT || 4000;

// create express application
const app = express();

// log requests coming into our app
app.use(morgan('dev'));

// parse body params and attach them to req.body
app.use(bodyParser.json());  // parses application/json content
app.use(bodyParser.text());  // parses text/plain content

app.get('/posts', async (req, res) => {
  const posts = await PostsC.find().toArray(); // get posts cursor, convert to array

  res.send(posts); // will stringify, set json headers, set status code
});

app.get('/users', async (req, res) => {
  const users = await UsersC.find().toArray();  // get users cursor, convert to array

  res.send(users);
});

// will get a particular user
app.get('/users/:id', async (req, res) => {  
  let id = '';
  if(ObjectID.isValid(req.params.id)){
    id = new ObjectID(req.params.id);
  }
  const user = await UsersC.findOne({_id: id});
  if(user){
    res.send(user);
  } else {
    res.sendStatus(404);
    console.log("User not found. 404")
  }

});

// will get a particular post
app.get('/posts/:id', async (req, res) => {
  let id = '';
  if(ObjectID.isValid(req.params.id)){
    id = new ObjectID(req.params.id);
  }
  const post = await PostsC.findOne({_id: id});
  if(post){
    res.send(post);
  } else {
    res.sendStatus(404);
    console.log("User not found. 404")
  }

});

app.post('/users', (req, res) => {
  res.send(req.body);
});

app.get('/', (req, res) => {
  res.send('Hello World\n');
});

app.use((req, res) => {
  res.sendStatus(404);
});

// Error handler, first param of callback is the error passed in through next
app.use((error, req, res) => {
  console.error(error);

  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`🚀 Hurray, server listening on port ${PORT}`);
});
