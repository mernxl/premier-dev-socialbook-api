const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectId;

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

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


// posts
app.use('/posts', postRouter);
// will get a particular post
app.use('/posts/:id', postRouter);

app.use('/users', userRouter);
// will get a particular user
app.use('/users/:id', userRouter);


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
