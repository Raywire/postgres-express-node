const express = require('express');
const { celebrate } = require('celebrate');
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const validator = require('../validators/validators');
const checkOwner = require('../middlewares/checkOwner');
const asyncHandler = require('../middlewares/asyncHandler');
const { checkParams } = require('../middlewares/reqParamChecker');
const { paginate } = require('../middlewares/pagination');

function todosRoutes() {
  const todosRouter = express.Router();
  todosRouter.use('/', paginate);
  todosRouter.route('/todos')
    .post(celebrate({ body: validator.validateTodo }), asyncHandler(todosController.createTodo))
    .get(asyncHandler(todosController.list));
  todosRouter.use('/todos/:todoId', checkParams, asyncHandler(checkOwner.findTodo));
  todosRouter.route('/todos/:todoId')
    .get(asyncHandler(todosController.retrieve))
    .put(celebrate({ body: validator.validateTodo }), asyncHandler(todosController.update))
    .delete(asyncHandler(todosController.destroy));
  todosRouter.route('/todos/:todoId/items')
    .post(celebrate({
      body: validator.validateTodoItem,
    }), asyncHandler(todoItemsController.createTodoItem));
  todosRouter.use('/todos/:todoId/items/:todoItemId', checkParams);
  todosRouter.route('/todos/:todoId/items/:todoItemId')
    .put(celebrate({ body: validator.validateTodoItem }), asyncHandler(todoItemsController.update))
    .delete(asyncHandler(todoItemsController.destroy));
  todosRouter.route('*')
    .all((req, res) => {
      res.status(405).send({
        message: 'Method Not Allowed',
      });
    });

  return todosRouter;
}

module.exports = todosRoutes;
