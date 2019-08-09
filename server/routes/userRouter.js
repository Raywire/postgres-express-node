const express = require('express');
const { celebrate } = require('celebrate');
const usersController = require('../controllers').users;
const validator = require('../validators/validators');

function userRoutes() {
  const userRouter = express.Router();

  userRouter.route('/auth/signup')
    .post(celebrate({ body: validator.validateUser }), usersController.signup);
  userRouter.route('/auth/login')
    .post(usersController.login);

  return userRouter;
}

module.exports = userRoutes;
