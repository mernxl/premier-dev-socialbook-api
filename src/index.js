const http = require('http');

const PORT = 4000;

const server = http.createServer((request, response) => {

  if (request.url === '/posts') {
    response.statusCode = 200;
    return response.end('Post list\n');
  }

  if (request.url === '/users') {
    response.statusCode = 200;
    return response.end('User list\n');
  }

  if (request.url === '/') {
    response.statusCode = 200;
    response.end('Hello World\n');
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
