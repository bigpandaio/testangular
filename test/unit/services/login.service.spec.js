describe('Login controller tests', function () {

  var expect = chai.expect;

  // STEP 1: Initialize module before each test case
  beforeEach(function () {
    module('testangular', function ($provide) {
    });
  });

  // TODO: STEP X: It is considered best practice to verify, after each test case, that
  // there are no additional outstanding expectations or requests
  afterEach(function () {
    inject(['$httpBackend', function ($http) {
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    }]);
  })

  describe('#login', function () {

    // STEP 2: We can configure Request Expectations on Angular's $httpBackend mock object.
    // In this test case we make sure that calling #login on the service results in an HTTP POST request to /login.
    // Notice that the test will fail in case the expected HTTP call is not executed.
    it('should send an http POST request to http://<domain>/login',

        // Use angular's built-in injection mechanism to get a hold of the mock $httpBackend object
        inject(['$httpBackend', 'LoginService', function ($httpBackend, loginService) {

          // You can capture requests that are expected to be sent over HTTP to a certain endpoint.
          // Use regular expression to capture all requests to a certain endpoint regardless
          // of the domain to which they are sent. This provides more flexibility when testing your app
          // with different configuration per environment.
          $httpBackend.expectPOST(/http:\/\/.+\/login/).respond(200);
          loginService.login("wileecayote@acme.com", "testangular");

          // You must explicitly call $httpBackend#flush() to execute the mock behavior you defined.
          // Explicitly flushing requests turns the interaction with the $http service to be synchronous
          // while preserving the async api of the backend.
          $httpBackend.flush();
        }]))

    // STEP 3: Alternitively, we can configure Backend Definitions on Angular's $httpBackend mock object.
    // In contrast to Request Expectations, Backend Definitions only define how the $httpBackend should
    // behave under certain conditions. The test might pass whether the expected HTTP call was executed or not.
    it('should handle HTTP status code 401',

        inject(['$httpBackend', 'LoginService', function ($httpBackend, loginService) {

          // Use the whenX methods to configure Backend Definitions
          $httpBackend.whenPOST(/http:\/\/.+\/login/).respond(401);
          loginService.login("wileecayote@acme.com", "testangular", function (error) {
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal('Invalid username or password');
          });

          $httpBackend.flush();

        }]));

    // This is the exact same test case as above only this time we use the Promise paradigm instead of plain old callbacks.
    // Look how nice the code looks!
    it('should handle HTTP status code 401', function() {

      inject(['$httpBackend', 'LoginService', function($httpBackend, loginService) {

        $httpBackend.whenPOST(/http:\/\/.+\/login/).respond(401);
        var promise = loginService.login("wileecayote@acme.com", "testangular");

        $httpBackend.flush();

        // We use the chai-as-promised extension to perfrom assertions on promises
        expect(promise).to.be.rejected.with("Invalid username or password");


      }]);
    })
  })


});