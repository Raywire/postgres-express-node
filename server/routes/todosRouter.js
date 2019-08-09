const express = require('express');
const { celebrate } = require('celebrate');
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const validator = require('../validators/validators');

function todosRoutes() {
  const todosRouter = express.Router();
  todosRouter.route('/todos')
    .post(celebrate({ body: validator.validateTodo }), todosController.createTodo)
    .get(todosController.list);
  todosRouter.route('/todos/:todoId')
    .get(todosController.retrieve)
    .put(celebrate({ body: validator.validateTodo }), todosController.update)
    .delete(todosController.destroy);
  todosRouter.route('/todos/:todoId/items')
    .post(celebrate({ body: validator.validateTodoItem }), todoItemsController.createTodoItem)
  todosRouter.route('/todos/:todoId/items/:todoItemId')
    .put(celebrate({ body: validator.validateTodoItem }), todoItemsController.update)
    .delete(todoItemsController.destroy);
  todosRouter.route('*')
    .all((req,res) => {
      res.status(405).send({
        message: 'Method Not Allowed',
      })
    })

  return todosRouter;
}

module.exports = todosRoutes;
