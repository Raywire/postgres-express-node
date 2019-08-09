const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  findTodo(req, res, next) {
    return Todo.findByPk(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          attributes: ['id', 'complete', 'content', 'todoId', 'createdAt', 'updatedAt'],
          as: 'todoItems'
        }
      ]
    })
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      if(todo.UserId !== req.user.id){
        return res.status(403).send({ message: 'Forbidden, only the owner can perform this action' });
      }
      req.todo = todo;
      return next();
    })
  }
};
