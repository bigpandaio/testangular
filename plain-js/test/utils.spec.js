// Step: Define chai
var expect = chai.expect;

// Step: Define the test
describe('Test our plain old JavaScript function', function() {
  it('should reject email without domain', function() {

    // Step: add the expectation
    expect(validateEmail('wileecayote@')).to.be.false;
  })
})
