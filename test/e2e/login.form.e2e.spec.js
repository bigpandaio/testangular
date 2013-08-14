describe('End to end test for the login form', function () {

  // Step: The navigation command allow to change the location in the brows
  beforeEach(function() {
    browser().navigateTo('/');
  });

  it("Should show error if invalid email", function() {
    input('username').enter('wileecayote');
    input('password').enter('testangular');

    element('input[type="submit"]').click();

    var errorDiv = element('.error', 'Error div');
    expect(errorDiv.text()).toMatch(/Invalid.+/);
    expect(errorDiv.css('color')).toEqual('rgb(235, 73, 35)');

  });

  it("Should show be successful if valid username + password", function() {
    input('username').enter('wileecayote@acme.com');
    input('password').enter('testangular');

    element('input[type="submit"]').click();
    expect(element('.success').text()).toEqual('hurray!');
  });
  
});

// karma start karma-e2e.conf.js --single-run