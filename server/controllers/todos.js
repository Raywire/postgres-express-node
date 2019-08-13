const { Todo } = require('../models');
const { TodoItem } = require('../models');

module.exports = {
  async createTodo(req, res) {
    const { body, user } = req;
    const createdTodo = await Todo.create({
      title: body.title,
      UserId: user.id,
    });
    return res.status(201).send(createdTodo);
  },

  async list(req, res) {
    const todos = await Todo.findAll({
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
    });
    return res.status(200).send(todos);
  },

  retrieve(req, res) {
    return res.status(200).send(req.todo);
  },

  async update(req, res) {
    const { todo, body } = req;
    const updatedTodo = await todo.update({
      title: body.title,
    });
    return res.status(200).send(updatedTodo);
  },

  async destroy(req, res) {
    const { todo } = req;
    await todo.destroy();
    return res.sendStatus(204);
  },
};
