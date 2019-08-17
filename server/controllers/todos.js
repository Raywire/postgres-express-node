import db from '../models';

const createTodo = async (req, res) => {
  const { body, user } = req;
  const createdTodo = await db.Todo.create({
    title: body.title,
    UserId: user.id,
  });
  return res.status(201).send(createdTodo);
};

const list = async (req, res) => {
  const { limit, page, offset } = req.query;

  const todos = await db.Todo.findAndCountAll({
    limit,
    offset,
    where: { UserId: req.user.id },
    include: [
      {
        model: db.TodoItem,
        attributes: ['id', 'complete', 'content', 'todoId', 'createdAt', 'updatedAt'],
        as: 'todoItems',
      },
    ],
    order: [
      ['createdAt', 'DESC'],
      [{ model: db.TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
    ],
  });

  const meta = {
    total: todos.count,
    pageCount: Math.ceil(todos.count / limit),
    perPage: limit,
    page,
  };
  return res.status(200).send({ meta, data: todos.rows });
};

const retrieve = (req, res) => res.status(200).send(req.todo);

const update = async (req, res) => {
  const { todo, body } = req;
  const updatedTodo = await todo.update({
    title: body.title,
  });
  return res.status(200).send(updatedTodo);
};

const destroy = async (req, res) => {
  const { todo } = req;
  await todo.destroy();
  return res.sendStatus(204);
};

export default {
  createTodo,
  list,
  retrieve,
  update,
  destroy,
};
