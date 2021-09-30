const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
/*
 * Adding right headers to responses
 * - Request Methods (GET and POST)
 *
 * - switch to express
 * - add mongodb
 */

// import dummy data
// require('../import-data');
mongoose.connect('mongodb://localhost:27017/sb-backend', {useNewUrlParser: true, })
 .then(res => console.log("conected..."))
 .catch(err=>console.log("Error", err))

// heruko sets a port on the PORT env var
const PORT = process.env.PORT || 4000;

// create express application
const app = express();

// log requests coming into our app
app.use(morgan('dev'));

// parse body params and attach them to req.body
app.use(bodyParser.json());  // parses application/json content
app.use(bodyParser.text());  // parses text/plain content

// comments
app.use('/comments', commentRouter);
// posts
app.use('/posts', postRouter);
// users 
app.use('/users', userRouter);
// user auth
app.use('/api/v1/auth', authRouter);

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
