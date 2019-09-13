import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import checkOwner from '../../middlewares/checkOwner';
import db from '../../models';

import { deleteTestUser } from '../utils';


const { expect } = chai;

chai.use(sinonChai);

let user;
let todo;
let todoItem;

describe('utils', () => {
  before(async () => {
    user = await db.User.create({ username: 'testuser4@test.com', password: '1234567' });
    todo = await db.Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
    todoItem = await db.TodoItem.create({ content: 'Watch Season 1', todoId: todo.id });
  });

  after(async () => {
    await deleteTestUser('testuser4@test.com');
  });

  describe('checkOwner', () => {
    it('should return call next if todo is found', async () => {
      const request = {
        user: {
          id: user.id,
        },
        todo,
        todoItem,
        params: {
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      await checkOwner(req, res, next);
      expect(next.called).to.be.true;
    });

    it('should return 404 if todo is not found', async () => {
      const request = {
        user: {
          id: user.id,
        },
        todo,
        todoItem,
        params: {
          todoId: 100000,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      await checkOwner(req, res, next);
      expect(res.status).to.have.been.calledWith(404);
    });

    it('should return 403 if user is not authorized to access a todo', async () => {
      const request = {
        user: {
          id: 100000,
        },
        todo,
        todoItem,
        params: {
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      await checkOwner(req, res, next);
      expect(res.status).to.have.been.calledWith(403);
    });
  });
});
