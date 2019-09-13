import express from 'express';
import { celebrate } from 'celebrate';
import validator from '../validators/validators';
import checkOwner from '../middlewares/checkOwner';
import asyncHandler from '../middlewares/asyncHandler';
import paramChecker from '../middlewares/reqParamChecker';
import paginate from '../middlewares/pagination';
import controller from '../controllers';

const todosRoutes = () => {
  const todosRouter = express.Router();
  todosRouter.use('/', paginate);
  todosRouter.route('/todos')
    .post(celebrate({ body: validator.validateTodo }), asyncHandler(controller.todos.createTodo))
    .get(asyncHandler(controller.todos.list));
  todosRouter.use('/todos/:todoId', paramChecker.checkTodoParams, asyncHandler(checkOwner));
  todosRouter.route('/todos/:todoId')
    .get(asyncHandler(controller.todos.retrieve))
    .put(celebrate({ body: validator.validateTodo }), asyncHandler(controller.todos.update))
    .delete(asyncHandler(controller.todos.destroy));
  todosRouter.route('/todos/:todoId/items')
    .post(celebrate({
      body: validator.validateTodoItem,
    }), asyncHandler(controller.todoItems.createTodoItem));
  todosRouter.use('/todos/:todoId/items/:todoItemId', paramChecker.checkTodoParams);
  todosRouter.route('/todos/:todoId/items/:todoItemId')
    .put(celebrate({ body: validator.validateTodoItem }), asyncHandler(controller.todoItems.update))
    .delete(asyncHandler(controller.todoItems.destroy));
  todosRouter.route('*')
    .all((req, res) => {
      res.status(405).send({
        message: 'Method Not Allowed',
      });
    });

  return todosRouter;
};

export default todosRoutes;
