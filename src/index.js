const express = require('express');

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

app.get('/posts', (req, res) => {
  res.send(posts); // will stringify, set json headers, set status code
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res, next) => {
  let body = [];

  // listen to data stream from the client
  return req.on('data', chunk => {
    body.push(chunk);
  })
    .on('end', () => {
      // convert the buffer array to a string
      body = Buffer.concat(body).toString();

      // convert the string to an object
      try {
        // without this try catch block, an error in the JSON format will kill our server
        body = JSON.parse(body); // use the object for what ever reason
      } catch (e) {
        return next(e); // will call the error handler of express
      }

      res.send(body);
    });
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
