const http = require('http');

/*
 * Adding right headers to responses
 * - Request Methods (GET and POST)
 */

// require will convert this into a JS object
const users = require('./db/users.json');
const posts = require('./db/posts.json');

// heruko sets a port on the PORT env var
const PORT = process.env.PORT || 4000;


const server = http.createServer((request, response) => {

  // normalise the method to uppercase
  const method = request.method.toUpperCase();

  if (request.url === '/posts') {
    response.statusCode = 200;

    // this will tell the client the resource media type (what we are sending)
    response.setHeader('Content-Type', 'application/json');

    response.write(JSON.stringify(posts));
    return response.end();
  }

  if (request.url === '/users') {

    if (method === 'GET') {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      response.write(JSON.stringify(users));
      return response.end();
    }

    if (method === 'POST') {
      let body = [];

      // listen to data stream from the client
      return request.on('data', chunk => {
        body.push(chunk);
      })
        .on('end', () => {
          // convert the buffer array to a string
          body = Buffer.concat(body).toString();

          response.on('error', (err) => {
            console.error(err);
          });

          // convert the string to an object
          try {
            // without this try catch block, an error in the JSON format will kill our server
            body = JSON.parse(body); // use the object for what ever reason
          } catch (e) {
            response.statusCode = 500;
            return response.end();
          }

          response.statusCode = 200;
          response.setHeader('Content-Type', 'application/json');

          response.end(JSON.stringify(body));
        });
    }

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
