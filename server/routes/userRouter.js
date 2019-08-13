const express = require('express');
const { celebrate } = require('celebrate');
const usersController = require('../controllers').users;
const validator = require('../validators/validators');
const asyncHandler = require('../middlewares/asyncHandler');

function userRoutes() {
  const userRouter = express.Router();

  userRouter.route('/auth/signup')
    .post(celebrate({ body: validator.validateUser }), asyncHandler(usersController.signup));
  userRouter.route('/auth/login')
    .post(celebrate({ body: validator.validateLogin }), asyncHandler(usersController.login));

  return userRouter;
}

module.exports = userRoutes;
