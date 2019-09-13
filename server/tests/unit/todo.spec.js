import chai from 'chai';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import todosController from '../../controllers/todos';
import db from '../../models';
import { deleteTestUser } from '../utils';

const { expect } = chai;

chai.use(sinonChai);

let user;
let todo;

describe('todo.controller', () => {
  before(async () => {
    user = await db.User.create({ username: 'testuser2@test.com', password: '1234567' });
    todo = await db.Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
  });

  after(async () => {
    await deleteTestUser('testuser2@test.com');
  });

  describe('retrieve', () => {
    it('should return a single todo', (done) => {
      const request = {
        user: { id: user.id },
        todo,
      };
      const req = mockReq(request);
      const res = mockRes();
      todosController.retrieve(req, res);
      expect(res.status).to.have.been.calledWith(200);
      done();
    });
  });

  describe('list', () => {
    it('should return all todos', async () => {
      const request = {
        user: { id: user.id },
        todo,
      };
      const req = mockReq(request);
      const res = mockRes();
      await todosController.list(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('createTodo', () => {
    it('should return the created todo', async () => {
      const request = {
        user: { id: user.id },
        body: {
          title: 'Hello world',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await todosController.createTodo(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
  });

  describe('update', () => {
    it('should return the updated todo', async () => {
      const request = {
        user: { id: user.id },
        todo,
        body: {
          title: 'Hello NodeJS',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await todosController.update(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
