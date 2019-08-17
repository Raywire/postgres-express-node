
import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import asyncHandler from '../../middlewares/asyncHandler';

const { expect } = chai;

chai.use(sinonChai);

describe('asyncHandler', () => {
  it('should throw an error and return status code of 500', async () => {
    const throwError = async (req, res, next) => {
      const {
        data: { functionThatDoesNotExist },
      } = req;
      functionThatDoesNotExist();
    };
    const request = {
      headers: {
        authorization: '',
      },
    };
    const req = mockReq(request);
    const res = mockRes();
    const next = sinon.spy();

    const response = await asyncHandler(throwError);
    await response(req, res, next);
    expect(res.status).to.have.been.calledWith(500);
  });
});
