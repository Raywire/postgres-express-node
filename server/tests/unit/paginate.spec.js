const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { paginate } = require('../../middlewares/pagination');

chai.use(sinonChai);

describe('pagination', () => {
  describe('paginate', () => {
    it('should return 1 when a string is passed in as a query parameter for a page', (done) => {
      const request = {
        query: {
          page: 's',
          limit: 10
        }
      };
      const req = mockReq(request);
      const res = mockRes();

      paginate(req, res, () => {
        expect(req.query.page).to.equal(1);
        done()
      });
    });

    it('should return 0 when a string is passed in as a query parameter for a limit', (done) => {
      const request = {
        query: {
          page: 1,
          limit: 's'
        }
      };
      const req = mockReq(request);
      const res = mockRes();
      paginate(req, res, () => {
        expect(req.query.limit).to.equal(0);
        done()
      });

    });

    it('should return 0 when limit number is less than 0', (done) => {
      const request = {
        query: {
          page: 1,
          limit: '-2'
        }
      };
      const req = mockReq(request);
      const res = mockRes();
      paginate(req, res, () => {
        expect(req.query.limit).to.equal(0);
        done()
      });

    });

    it('should return 1 when page number is less than 1', (done) => {
      const request = {
        query: {
          page: '-1',
          limit: 2
        }
      };
      const req = mockReq(request);
      const res = mockRes();
      paginate(req, res, () => {
        expect(req.query.page).to.equal(1);
        done()
      });

    });

    it('should return actual page when page number is greater than 1', (done) => {
      const request = {
        query: {
          page: 1
        }
      };
      const req = mockReq(request);
      const res = mockRes();
      paginate(req, res, () => {
        expect(req.query.page).to.equal(1);
        done()
      });

    });
  });
});
