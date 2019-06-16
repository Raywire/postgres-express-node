const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

// Set up the express app
const app = express();

// Configure cors
app.use(cors());

// Initialize passport with express
app.use(passport.initialize());

// Log request to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes and passport into the application
require('./server/routes')(app, passport);
require('./server/config/passport')(passport);

// Setup a default catch-all route that sends back a welcome message in JSON format
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of insanity',
}));

module.exports = app;