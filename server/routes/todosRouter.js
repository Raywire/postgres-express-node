const express = require('express');
const { celebrate } = require('celebrate');
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const validator = require('../validators/validators');
const checkOwner = require('../utils/checkOwner');
const asyncHandler = require('../middlewares/asyncHandler');

function todosRoutes() {
  const todosRouter = express.Router();
  todosRouter.route('/todos')
    .post(celebrate({ body: validator.validateTodo }), asyncHandler(todosController.createTodo))
    .get(asyncHandler(todosController.list));
  todosRouter.use('/todos/:todoId', asyncHandler(checkOwner.findTodo));
  todosRouter.route('/todos/:todoId')
    .get(asyncHandler(todosController.retrieve))
    .put(celebrate({ body: validator.validateTodo }), asyncHandler(todosController.update))
    .delete(asyncHandler(todosController.destroy));
  todosRouter.route('/todos/:todoId/items')
    .post(celebrate({
      body: validator.validateTodoItem,
    }), asyncHandler(todoItemsController.createTodoItem));
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
