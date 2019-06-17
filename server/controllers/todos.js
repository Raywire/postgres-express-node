const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return Todo.create({
      title: req.body.title,
      UserId: req.user.id,
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
        return res.status(403).send({ message: 'You can only view your own todos' });
      }
      return res.status(200).send(todo);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Todo.findByPk(req.params.todoId)
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      if(todo.UserId !== req.user.id){
        return res.status(403).send({ message: 'You can only update your own todos' });
      }
      return todo.update({
        title: req.body.title || todo.title,
      })
      .then(() => res.status(200).send(todo))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Todo.findByPk(req.params.todoId)
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      if(todo.UserId !== req.user.id){
        return res.status(403).send({ message: 'You can only delete your own todos' });
      }
      return todo.destroy()
      .then(() => res.status(200).send({
        message: 'Todo deleted successfully'
      }))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};