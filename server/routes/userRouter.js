const express = require('express');
const usersController = require('../controllers').users;

function userRoutes() {
  const userRouter = express.Router();

  userRouter.route('/auth/signup')
    .post(usersController.signup);
  userRouter.route('/auth/login')
    .post(usersController.login);

  return userRouter;
}

module.exports = userRoutes;
