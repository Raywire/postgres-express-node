import chai from 'chai';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import db from '../../models';
import usersController from '../../controllers/users';
import { deleteTestUser } from '../utils';

const { expect } = chai;

chai.use(sinonChai);

let user;

describe('user.controller', () => {
  before(async () => {
    user = await db.User.create({ username: 'testuserchange@test.com', password: '1234567' });
  });

  after(async () => {
    await deleteTestUser('testuser3@test.com');
    await deleteTestUser('testuserchange@test.com');
  });

  describe('signup', () => {
    it('should return the created user', async () => {
      const request = {
        body: {
          username: 'testuser3@test.com',
          password: '12345678',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await usersController.signup(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
    it('should return 400 error when a user already exists', async () => {
      const request = {
        body: {
          username: 'testuser3@test.com',
          password: '12345678',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await usersController.signup(req, res);
      expect(res.status).to.have.been.calledWith(400);
    });
  });

  describe('login', () => {
    it('should return authentication failed when a username is not found', async () => {
      const request = {
        body: {
          username: 'testusernotfound@test.com',
          password: '12345678',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await usersController.login(req, res);
      expect(res.status).to.have.been.calledWith(401);
    });
  });

  describe('update password', () => {
    it('should return a 404 when a user is not found', async () => {
      const request = {
        body: {
          password: '12345678',
        },
        params: {
          userId: 10000,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await usersController.updatePassword(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('should return a 403 forbidden when a user tries to update the password of another user', async () => {
      const request = {
        body: {
          password: '12345678',
        },
        params: {
          userId: user.id,
        },
        user: {
          id: 44,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await usersController.updatePassword(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });
    it('should return a 200 on successful update of the password of a user', async () => {
      const request = {
        body: {
          password: '12345678',
        },
        params: {
          userId: user.id,
        },
        user: {
          id: user.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await usersController.updatePassword(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
