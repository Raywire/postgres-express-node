const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const joiErrors = require('../../middlewares/joiErrors');

chai.use(sinonChai);

describe('middlewares', () => {
  describe('joiErrors', () => {
    it('should return call next if there are no celebrate errors', (done) => {
      const request = {};
      const req = mockReq(request);
      const res = mockRes();
      const err = false;

      joiErrors(err, req, res, () => {
        expect(req.joiError).to.be.false;
        done();
      })
    });
  });
});
