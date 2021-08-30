/*
 * Adding right headers to responses
 * - Request Methods (GET and POST)
 *
 * - switch to express
 * - add mongodb
 */
const { app } = require('./config/express');

// import mongoose to ensure connection
require('./config/mongoose');

// import dummy data
require('../import-data');

// heroku sets a port on the PORT env var
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Hurray, server listening on port ${PORT}`);
});
