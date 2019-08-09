const express = require('express');
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

function todosRoutes() {
  const todosRouter = express.Router();
  todosRouter.route('/todos')
    .post(todosController.createTodo)
    .get(todosController.list);
  todosRouter.route('/todos/:todoId')
    .get(todosController.retrieve)
    .put(todosController.update)
    .delete(todosController.destroy);
  todosRouter.route('/todos/:todoId/items')
    .post(todoItemsController.createTodoItem)
    .put(todoItemsController.update)
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
