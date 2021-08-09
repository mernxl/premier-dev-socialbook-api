const http = require('http');

const PORT = 4000;

const server = http.createServer((request, response) => {

  response.statusCode = 200;

  // listen to and log out errors
  response.on('error', (err => {
    console.error(err)
  }))

  response.end('Hello World\n')
})

// Listen for connection events
server.on('connection', () => {
  console.log('New Connection')
})

server.listen(PORT, () => {
  console.log(`🚀 Hurray, server listening on port ${PORT}`)
})
