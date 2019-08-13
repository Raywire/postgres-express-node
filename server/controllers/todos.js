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
    const { limit, page, offset } = req.query;

    const todos = await Todo.findAndCountAll({
      limit,
      offset,
      where: { UserId: req.user.id },
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

    const meta = {
      total: todos.count,
      pageCount: Math.ceil(todos.count / limit),
      perPage: limit,
      page,
    };
    return res.status(200).send({ meta, data: todos.rows });
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
