import express from 'express';
import { celebrate } from 'celebrate';
import validator from '../validators/validators';
import asyncHandler from '../middlewares/asyncHandler';
import controller from '../controllers';

const authRoutes = () => {
  const authRouter = express.Router();

  authRouter.route('/auth/signup')
    .post(celebrate({ body: validator.validateUser }), asyncHandler(controller.users.signup));
  authRouter.route('/auth/login')
    .post(celebrate({ body: validator.validateLogin }), asyncHandler(controller.users.login));

  return authRouter;
};

export default authRoutes;
