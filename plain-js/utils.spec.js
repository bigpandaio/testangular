var expect = chai.expect;

describe('Test our plain old JavaScript function', function() {
  it('should invalidate email without domain', function() {
    expect(validateEmail('wileecayote@')).to.be.false;
  })
})