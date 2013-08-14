describe('Login controller tests', function () {

  var expect = chai.expect;

  beforeEach(function () {
    module('testangular');
  });

  describe('#login', function () {

    it('should send an http POST request to http://<domain>/login',

        // Step: Use angular's built-in injection mechanism to get a hold of the mock $httpBackend object.
        inject(['$httpBackend', 'LoginService', function ($httpBackend, loginService) {

          // Step: You can capture requests that are expected to be sent over HTTP to a certain endpoint.
          $httpBackend.expectPOST(/http:\/\/.+\/login/).respond(200);
          loginService.login("wileecayote@acme.com", "testangular");

          // Step: You must explicitly call $httpBackend#flush() to execute the mock behavior you defined.
          $httpBackend.flush();
        }]))

    it('should handle HTTP status code 401',

        inject(['$httpBackend', 'LoginService', function ($httpBackend, loginService) {

          // Step: Use the whenX methods to configure Backend Definitions
          $httpBackend.whenPOST(/http:\/\/.+\/login/).respond(401);

          // Step: perform expectation inside the callback
          loginService.login("wileecayote@acme.com", "testangular", function (error) {
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal('Invalid username or password');
          });

          $httpBackend.flush();

        }]));

    it('should use configured domain', inject(['configuration', function(configuration) {

//      sinon.stub(configuration, 'getDomain').returns('acme.com');

      // Step: we inject twice to allow the configuration service to be stubbed
      // BEFORE the LoginService is instantiated
      inject(['$httpBackend', 'LoginService', function ($httpBackend, loginService) {

        sinon.stub(configuration, 'getDomain').returns('acme.com');

        // Step: again we use expect, but this time we set an explicit domain
        $httpBackend.expectPOST(/http:\/\/acme\.com:\d+\/login/).respond(200);
        loginService.login("wileecayote@acme.com", "testangular");
        $httpBackend.flush();
      }])

    }]))

    it('should handle HTTP status code 401', function() {

      inject(['$httpBackend', 'LoginService', function($httpBackend, loginService) {

        // Step: using the promise interface
        $httpBackend.whenPOST(/http:\/\/.+\/login/).respond(401);
        var promise = loginService.login("wileecayote@acme.com", "testangular");

        $httpBackend.flush();

        // Step: we use the chai-as-promised extension to perfrom assertions on promises
        expect(promise).to.be.rejected.with("Invalid username or password");


      }]);
    })

  })

  // Step: It is considered best practice to verify, after each test case
  afterEach(function () {
    inject(['$httpBackend', function ($httpBackend) {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }]);
  })


});