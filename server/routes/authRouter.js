const express = require('express');
const { celebrate } = require('celebrate');
const usersController = require('../controllers').users;
const validator = require('../validators/validators');
const asyncHandler = require('../middlewares/asyncHandler');

function authRoutes() {
  const authRouter = express.Router();

  authRouter.route('/auth/signup')
    .post(celebrate({ body: validator.validateUser }), asyncHandler(usersController.signup));
  authRouter.route('/auth/login')
    .post(celebrate({ body: validator.validateLogin }), asyncHandler(usersController.login));

  return authRouter;
}

module.exports = authRoutes;
