const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Set up the express app
const app = express();

// Log request to the console
app.use(logger('dev'));

dotenv.config();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of insanity',
}));

module.exports = app;