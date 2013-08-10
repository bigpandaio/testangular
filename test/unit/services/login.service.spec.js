describe('Login controller tests', function () {

  var inject = angular.mock.inject;
  var module = angular.mock.module;
  var expect = chai.expect;

  // STEP 1: Initialize module before each test case
  beforeEach(function () {
    module('testangular', function($provide) {});
  });

  // TODO: STEP X: It is considered best practice to verify, after each test case, that
  // there are no additional outstanding expectations or requests
  afterEach(function() {
    inject(['$httpBackend', function($http) {
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    }]);
  })

  describe('#login', function() {

    // STEP 2: We can configure expectations on Angular's $httpBackend mock object.
    // You can capture requests that are expected to be sent over HTTP to a certain endpoint.
    it('should send an http POST request to http://<domain>/login',
        inject(['$httpBackend', 'LoginService', function($http, loginService) {

          // You can use regular expression to capture all requests to a certain endpoint regardless
          // of the domain to which they are sent. This provides more flexibility when testing your app
          // with different configuration per environment.
          $http.expectPOST(/http:\/\/.+\/login/).respond(200);
          loginService.login("shahar@acme.com", "testangular");

          // You must explicitly call $httpBackend#flush() to execute the mock behavior you defined.
          // Explicitly flushing requests turns the interaction with the $http service to be synchronous
          // while preserving the async api of the backend.
          $http.flush();

    }]))
  })


});