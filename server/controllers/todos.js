const { Todo } = require('../models');
const { TodoItem } = require('../models');

module.exports = {
  createTodo(req, res) {
    const { body, user } = req;
    return Todo.create({
      title: body.title,
      UserId: user.id,
    })
      .then((todo) => res.status(201).send(todo));
  },
  list(req, res) {
    return Todo.findAll({
      where: {
        UserId: req.user.id,
      },
      include: [
        {
          model: TodoItem,
          attributes: ['id', 'complete', 'content', 'todoId', 'createdAt', 'updatedAt'],
          as: 'todoItems',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
      ],
    })
      .then((todos) => res.status(200).send(todos));
  },
  retrieve(req, res) {
    return res.status(200).send(req.todo);
  },
  update(req, res) {
    const { todo, body } = req;
    return todo.update({
      title: body.title,
    })
      .then(() => res.status(200).send(todo));
  },
  destroy(req, res) {
    const { todo } = req;
    return todo.destroy()
      .then(() => res.sendStatus(204));
  },
};
