const http = require('http');

/*
 * Adding right headers to responses
 */

// require will convert this into a JS object
const users = require('./db/users.json');
const posts = require('./db/posts.json');

const PORT = 4000;


const server = http.createServer((request, response) => {

  if (request.url === '/posts') {
    response.statusCode = 200;

    // this will tell the client the resource media type (what we are sending)
    response.setHeader('Content-Type', 'application/json');

    response.write(JSON.stringify(posts));
    return response.end();
  }

  if (request.url === '/users') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    response.write(JSON.stringify(users));
    return response.end();
  }

  if (request.url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    return response.end('Hello World\n');
  }

  // listen to and log out errors
  response.on('error', (err => {
    console.error(err);
  }));

  response.statusCode = 404;
  response.end('Not Found\n');
});

server.listen(PORT, () => {
  console.log(`🚀 Hurray, server listening on port ${PORT}`);
});
