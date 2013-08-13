describe('Login controller tests', function () {

  var expect = chai.expect;

  beforeEach(function () {
    module('testangular');
  });

  describe('Invalid input', function () {

    it('Should add error when no input', inject(function ($controller, $rootScope) {

      // Step: controller construction
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.valid = false;
      scope.login();

      expect(scope.error).to.be.eq("Invalid email format");
    }));


    describe("Valid Input", function () {

      var loginService;

      // Step: A Factory method to create a new mock interface
      function createMockLoginService() {
        return {login: function () {
        }};
      }

      beforeEach(function () {
        module('testangular', function ($provide) {
          // Every test, start from scratch
          loginService = createMockLoginService();

          // Place our mock loginService as the new login
          $provide.value("LoginService", loginService);
        });
      });


      it('Should return error if invalid user', inject(function ($controller, $rootScope) {

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

      it('Should broadcast success if valid user', inject(function ($controller, $rootScope) {

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
});