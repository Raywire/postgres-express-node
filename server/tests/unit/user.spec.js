const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const usersController = require('../../controllers/users');
const { deleteTestUser } = require('../utils');

chai.use(sinonChai);

describe('user.controller', () => {
  after(async () => {
    await deleteTestUser('testuser3@test.com');
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
});
