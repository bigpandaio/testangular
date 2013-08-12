describe('Login controller tests', function () {

  // TODO - Move controller creation to the beforeEach ?


  // Steps:

  // Step 1: Just the describe line

  // Step 2: Add before each with module, inject expect

  var expect = chai.expect;

  beforeEach(function () {
    module('testangular');
  });


  // Step 3: Scope creation - Add a simple test with controller creation

  describe('Initialize Scope', function() {

    it('Should set initial properties', inject(function($controller, $rootScope) {
      // Controller creation with a new scope
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      expect(scope).to.have.property("username", null);
      expect(scope).to.have.property("password", null);
      expect(scope).to.have.property("error", null);
    }));
  });


  // Step 6: Adding functionality to the login method

  describe('Invalid input', function() {

    it('Should add error when no input', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.login();

      expect(scope.error).to.be.eq("Invalid email format");
    }));


    // Step 8: Add validation check using the directive

    it('Should add error when data is invalid', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.username = "test";

      scope.login();

      expect(scope.error).to.be.eq("Invalid email format");
    }));

    // Step 9: Add a check login service wasn't called
    // Require adding mock for LoginService

    describe("Calling Login Service", function() {

      var loginService;

      beforeEach(function () {
        module('testangular', function($provide) {
          loginService = sinon.spy();

          // Place our mock loginService as the new login
          $provide.value("LoginService", loginService);
        });
      });

      it('Should not happen', inject(function($controller, $rootScope) {
        var scope = $rootScope.$new();
        $controller("LoginController", { $scope: scope });

        scope.username = "test";

        scope.login();

        expect(loginService).to.not.be.called;
      }));
    })
  });


  // Step 10: Adding test for valid input

  describe("Valid Input", function() {

    var loginService;

    // A Factory method to create a new mock interface
    function createMockLoginService() {
      return {login: function() {}};
    }

    beforeEach(function () {
      module('testangular', function($provide) {
        // Every test, start from scratch
        loginService = createMockLoginService();

        // Place our mock loginService as the new login
        $provide.value("LoginService", loginService);
      });
    });

    it('Should return error if invalid user', inject(function($controller, $rootScope) {

      sinon.stub(loginService, "login").callsArgWith(2, new Error("Invalid username or password"));

      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.username = "test";
      scope.password = "1234";

      scope.valid = true;

      scope.login();

      expect(scope.error).to.be.eq("Invalid username or password");
    }));

    // Step 13: Add valid test

    it('Should broadcast success if valid user', inject(function($controller, $rootScope) {

      sinon.stub(loginService, "login").callsArgWith(2, null, {});

      var successHandler = sinon.spy();

      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.username = "test";
      scope.password = "1234";
      scope.valid = true;

      // Register the spy as the handler - just checking if it was called.
      $rootScope.$on("LoginController.successful", successHandler);

      scope.login();

      expect(successHandler).to.be.called;
    }));
  });
});