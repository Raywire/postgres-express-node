import db from '../models';

const checkOwner = async (req, res, next) => {
  const todo = await db.Todo.findByPk(req.params.todoId, {
    include: [
      {
        model: db.TodoItem,
        attributes: ['id', 'complete', 'content', 'todoId', 'createdAt', 'updatedAt'],
        as: 'todoItems',
      },
    ],
  });

  if (!todo) {
    return res.status(404).send({
      message: 'Todo Not Found',
    });
  }

  if (todo.UserId !== req.user.id) {
    return res.status(403).send({ message: 'Forbidden, only the owner can perform this action' });
  }

  req.todo = todo;
  return next();
};

export default checkOwner;
