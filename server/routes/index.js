const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;

module.exports = (app, passport) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
  app.post('/api/todos', passport.authenticate('jwt', { session: false }), todosController.create);
  app.get('/api/todos', passport.authenticate('jwt', { session: false }), todosController.list);
  app.get('/api/todos/:todoId', passport.authenticate('jwt', { session: false }), todosController.retrieve);
  app.put('/api/todos/:todoId', passport.authenticate('jwt', { session: false }), todosController.update);
  app.delete('/api/todos/:todoId', passport.authenticate('jwt', { session: false }), todosController.destroy);
  
  app.post('/api/todos/:todoId/items', passport.authenticate('jwt', { session: false }), todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', passport.authenticate('jwt', { session: false }), todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', passport.authenticate('jwt', { session: false }), todoItemsController.destroy);
  
  app.post('/auth/signup', usersController.create);
  app.post('/auth/login', usersController.login);

  // For any other request method on todo items ,we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};