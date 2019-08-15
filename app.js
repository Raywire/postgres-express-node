const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const joiErrors = require('./server/middlewares/joiErrors');

// Require our routes and passport into the application
const todosRouter = require('./server/routes').todosRouter();
const authRouter = require('./server/routes').authRouter();
const usersRouter = require('./server/routes').usersRouter();
const { passportAuth } = require('./server/config/passport');

passportAuth(passport);

const apiPrefix = '/api';

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

app.use(apiPrefix, passport.authenticate('jwt', { session: false }));
app.use(apiPrefix, usersRouter);
app.use(apiPrefix, todosRouter);
app.use(authRouter);

app.use(joiErrors);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of insanity',
  api_docs: 'https://documenter.getpostman.com/view/6831940/SVYtNdfm',
}));

// Return 404 for nonexistent routes
app.use((req, res) => res.status(404).send({ message: 'Route not found' }));

module.exports = app;
