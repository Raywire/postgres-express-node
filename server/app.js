import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import joiErrors from './middlewares/joiErrors';

// Require our routes and passport into the application
import routers from './routes';
import passportAuth from './config/passport';

dotenv.config();
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
app.use(apiPrefix, routers.usersRouter());
app.use(apiPrefix, routers.todosRouter());
app.use(routers.authRouter());

app.use(joiErrors);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of insanity',
  api_docs: 'https://documenter.getpostman.com/view/6831940/SVYtNdfm',
}));

// Return 404 for nonexistent routes
app.use((req, res) => res.status(404).send({ message: 'Route not found' }));

module.exports = app;
