const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

/*
 * Adding right headers to responses
 * - Request Methods (GET and POST)
 *
 * - switch to express
 */

// require will convert this into a JS object
const users = require('./db/users.json');
const posts = require('./db/posts.json');

// heruko sets a port on the PORT env var
const PORT = process.env.PORT || 4000;

// create express application
const app = express();

// log requests coming into our app
app.use(morgan('dev'))

// parse body params and attach them to req.body
app.use(bodyParser.json())  // parses application/json content
app.use(bodyParser.text())  // parses text/plain content

app.get('/posts', (req, res) => {
  res.send(posts); // will stringify, set json headers, set status code
});

app.get('/users', (req, res) => {
  res.send(users);
});

// will get a particular user
app.get('/users/:id', (req, res) => {
  let id = req.params.id;
  let user = users.find(user => user.id == id);
  if(user){
    console.log(`No user with id=${id} found`);
    res.sendStatus(404)
  } else {
    // console.log(user);
    res.send(user);
  }
});

// will get a particular post
app.get('/posts/:id', (req, res) => {
  let id = req.params.id;
  let post = posts.find(post => post.id == id);
  if(post){
    res.sendStatus(404)
  } else {
    // console.log(post);
    res.send(post);
  }
});

app.post('/users', (req, res, next) => {
  res.send(req.body);
});

app.get('/', (req, res) => {
  res.send('Hello World\n');
});

app.use((req, res) => {
  res.sendStatus(404)
});

// Error handler, first param of callback is the error passed in through next
app.use((error, req, res, next) => {
  console.error(error);

  res.sendStatus(500)
});

app.listen(PORT, () => {
  console.log(`🚀 Hurray, server listening on port ${PORT}`);
});
