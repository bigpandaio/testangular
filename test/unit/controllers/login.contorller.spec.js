describe('Login controller tests', function () {

  // TODO - Move controller creation to the beforeEach ?


  // Steps:

  // Step 1: Just the describe line

  // Step 2: Add before each with module, inject expect

  var inject = angular.mock.inject;
  var module = angular.mock.module;
  var expect = chai.expect;


  beforeEach(function () {
    module('testangular');
  });


  // Step 3: Scope creation - Add a simple test with controller creation

  describe('Initialize Scope', function() {

    it('Should set initial properties', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      expect(scope).to.have.property("username", null);
      expect(scope).to.have.property("password", null);
    }));

    it('Should start as invalid', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      expect(scope).to.have.property("valid", false);
    }));
  });


  // Step 6: Adding functionallity to the login method

  describe('Invalid input', function() {

    it('Should add error when no input', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.login();

      expect(scope.error).to.be.eq("Please fill in all fields");
    }));


    // Step 8: Add validation check using the directive

    it('Should add error when data is invalid', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.username = "test";

      scope.login();

      expect(scope.error).to.be.eq("Please fill in all fields");
    }));
  });

  // Step 9: Add a check login service wasn't called
  // Require adding mock for LoginService

  // Step 10: Adding test for valid input
  // LoginService is called

  // Step 13: Add a check for valid login and invalid login (using mock)




});