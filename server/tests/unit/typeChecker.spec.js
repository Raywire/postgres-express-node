const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { isNumber } = require('../../utils/typeChecker');

chai.use(sinonChai);

describe('typeChecker', () => {
  describe('isNumber', () => {
    it('should return true if value is a positive integer', (done) => {
      expect(isNumber(4)).to.be.true;
      expect(isNumber(434)).to.be.true;
      done()
    });

    it('should return false if value is a negative integer', (done) => {
      expect(isNumber(-4)).to.be.false;
      done()
    });

    it('should return false if value is a float', (done) => {
      expect(isNumber(4.1)).to.be.false;
      expect(isNumber(4.9)).to.be.false;
      done()
    });

    xit('should return false if value is a .0 float', (done) => {
      expect(isNumber(4.0)).to.be.false;
      done()
    });

    it('should return true if value is a string of a valid number', (done) => {
      expect(isNumber('4')).to.be.true;
      done()
    });

    it('should return false if value is a string of a valid number', (done) => {
      expect(isNumber('4s')).to.be.false;
      done()
    });
  });
});
