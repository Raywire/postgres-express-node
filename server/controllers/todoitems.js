import db from '../models';

const createTodoItem = async (req, res) => {
  const todoItem = await db.TodoItem.create({
    content: req.body.content,
    todoId: req.params.todoId,
  });
  return res.status(201).send(todoItem);
};

const update = async (req, res) => {
  const todoItem = await db.TodoItem.findOne({
    attributes: ['id', 'todoId', 'content', 'complete', 'updatedAt'],
    where: {
      id: req.params.todoItemId,
      todoId: req.params.todoId,
    },
  });

  if (!todoItem) {
    return res.status(404).send({
      message: 'TodoItem Not Found',
    });
  }
  const updatedTodoItem = await todoItem.update({
    content: req.body.content || todoItem.content,
    complete: req.body.complete || todoItem.complete,
  });
  return res.status(200).send(updatedTodoItem);
};

const destroy = async (req, res) => {
  const todoItem = await db.TodoItem.findOne({
    attributes: ['id'],
    where: {
      id: req.params.todoItemId,
      todoId: req.params.todoId,
    },
  });

  if (!todoItem) {
    return res.status(404).send({
      message: 'TodoItem Not Found',
    });
  }
  await todoItem.destroy();
  return res.sendStatus(204);
};

export default {
  createTodoItem,
  update,
  destroy,
};
