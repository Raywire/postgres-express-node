
const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const asyncHandler = require('../../middlewares/asyncHandler');

chai.use(sinonChai)

describe('asyncHandler', () => {
  it('should throw an error and return status code of 500', async () => {
    const throwError = async (req, res, next) => {
      const {
        data: { functionThatDoesNotExist },
      } = req
      functionThatDoesNotExist()
    }
    const request = {
      headers: {
        authorization: '',
      },
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    const response = await asyncHandler(throwError)
    await response(req, res, next)
    expect(res.status).to.have.been.calledWith(500)
  })
})
