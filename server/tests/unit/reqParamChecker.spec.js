import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import paramChecker from '../../middlewares/reqParamChecker';

const { expect } = chai;

chai.use(sinonChai);

describe('Request param checker', () => {
  describe('checkParams', () => {
    it('should return 400 if todoId is not a positive integer', (done) => {
      const request = {
        params: {
          todoId: -2,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoId is a string', (done) => {
      const request = {
        params: {
          todoId: 's',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoId is a float', (done) => {
      const request = {
        params: {
          todoId: 1.1,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    xit('should return 400 if the todoId is a .0 float', (done) => {
      const request = {
        params: {
          todoId: 1.0,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoId is a string that is alphanumeric', (done) => {
      const request = {
        params: {
          todoId: '4s',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoItemId is not a positive integer', (done) => {
      const request = {
        params: {
          todoId: 1,
          todoItemId: -2,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoItemId is a string', (done) => {
      const request = {
        params: {
          todoId: 1,
          todoItemId: 's',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoItemId is an alphanumeric string', (done) => {
      const request = {
        params: {
          todoId: 1,
          todoItemId: '4s',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return 400 if the todoItemId is a float', (done) => {
      const request = {
        params: {
          todoId: 1,
          todoItemId: 2.3,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    xit('should return 400 if the todoItemId is a .0 float', (done) => {
      const request = {
        params: {
          todoId: 1,
          todoItemId: 2.0,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      done();
    });

    it('should return call next if all checks pass', (done) => {
      const request = {
        params: {
          todoId: 1,
          todoItemId: 4,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();

      paramChecker.checkTodoParams(req, res, next);
      expect(next.called).to.be.true;
      done();
    });

    describe('checkParams for user', () => {
      it('should return 400 if userId is not a positive integer', (done) => {
        const request = {
          params: {
            userId: -2,
          },
        };
        const req = mockReq(request);
        const res = mockRes();
        const next = sinon.spy();

        paramChecker.checkUserParams(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        done();
      });

      it('should return 400 if the userId is a string', (done) => {
        const request = {
          params: {
            userId: 's',
          },
        };
        const req = mockReq(request);
        const res = mockRes();
        const next = sinon.spy();

        paramChecker.checkUserParams(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        done();
      });

      it('should return 400 if the userId is a float', (done) => {
        const request = {
          params: {
            userId: 1.1,
          },
        };
        const req = mockReq(request);
        const res = mockRes();
        const next = sinon.spy();

        paramChecker.checkUserParams(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        done();
      });

      xit('should return 400 if the userId is a .0 float', (done) => {
        const request = {
          params: {
            userId: 1.0,
          },
        };
        const req = mockReq(request);
        const res = mockRes();
        const next = sinon.spy();

        paramChecker.checkUserParams(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        done();
      });

      it('should return 400 if the userId is a string that is alphanumeric', (done) => {
        const request = {
          params: {
            userId: '4s',
          },
        };
        const req = mockReq(request);
        const res = mockRes();
        const next = sinon.spy();

        paramChecker.checkUserParams(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        done();
      });
    });
  });
});
