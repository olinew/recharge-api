// Create the app
const express = require('express');
const app = express();

// Register the routes
const routes = require('./routes.js')
routes(app);

// Start listening
app.listen(3000);
