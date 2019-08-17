import chai from 'chai';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import joiErrors from '../../middlewares/joiErrors';

const { expect } = chai;

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
      });
    });
  });
});
