const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

// Require our routes and passport into the application
const todosRouter = require('./server/routes').todosRouter();
const userRouter = require('./server/routes').userRouter();
require('./server/config/passport')(passport);

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

app.use('/api', passport.authenticate('jwt', { session: false }), todosRouter);
app.use(userRouter);

// Setup a default catch-all route that sends back a welcome message in JSON format
app.use('/', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of insanity',
    api_docs: 'https://documenter.getpostman.com/view/6831940/SVYtNdfm'
}));

// Return 404 for nonexistent routes
app.use((req, res) => res.status(404).send({ message: 'Route not found' }))

module.exports = app;