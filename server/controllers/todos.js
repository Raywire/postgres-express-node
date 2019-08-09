const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  createTodo(req, res) {
    const { body, user } = req;
    return Todo.create({
      title: body.title,
      UserId: user.id,
    })
    .then(todo => res.status(201).send(todo))
    .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Todo.findAll({
      where: {
        UserId: req.user.id
      },
      include: [
        {
          model: TodoItem,
          attributes: ['id', 'complete', 'content', 'todoId', 'createdAt', 'updatedAt'],
          as: 'todoItems'
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: TodoItem, as: 'todoItems'}, 'createdAt', 'ASC'],
      ],
    })
    .then(todos => res.status(200).send(todos))
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return res.status(200).send(req.todo);
  },
  update(req, res) {
    const { todo, body } = req;
    return todo.update({
      title: body.title || todo.title,
    })
    .then(() => res.status(200).send(todo))
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    const { todo } = req;
    return todo.destroy()
    .then(() => res.sendStatus(204))
    .catch(error => res.status(400).send(error));
  }
};
