const express = require('express');
const { celebrate } = require('celebrate');
const usersController = require('../controllers').users;
const validator = require('../validators/validators');
const asyncHandler = require('../middlewares/asyncHandler');

function userRoutes() {
  const userRouter = express.Router();

  userRouter.route('/users/:userId')
    .patch(celebrate({
      body: validator.validatePassword,
    }), asyncHandler(usersController.updatePassword));

  return userRouter;
}

module.exports = userRoutes;
