import express from 'express';
import { celebrate } from 'celebrate';
import validator from '../validators/validators';
import asyncHandler from '../middlewares/asyncHandler';
import paramChecker from '../middlewares/reqParamChecker';
import controller from '../controllers';

const userRoutes = () => {
  const userRouter = express.Router();

  userRouter.use('/users/:userId', paramChecker.checkUserParams);
  userRouter.route('/users/:userId')
    .patch(celebrate({
      body: validator.validatePassword,
    }), asyncHandler(controller.users.updatePassword));

  return userRouter;
};

export default userRoutes;
