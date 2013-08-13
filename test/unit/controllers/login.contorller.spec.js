describe('Login controller tests', function () {

  var expect = chai.expect;

  describe('Invalid username format', function () {

    beforeEach(function () {
      module('testangular');
    });

    it('should set the error message to "invalid email format"', inject(function ($controller, $rootScope) {

      // Step: controller construction
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      // Step: we're setting the valid property in the scope to false,
      // so that calling #login will result in an error
      scope.valid = false;

      scope.login();

      expect(scope.error).to.be.eq("Invalid email format");
    }));

  });

  describe('i18n#resolve() output', function() {

    beforeEach(function () {
      module('testangular', function($provide) {
        // Step: provide the module with an interface for the i18n service
        // Because this happens before each test, a new "fresh" object will be
        // injected into the actual test functions
        $provide.value('i18n', { resolve: function(message) {} })
      });
    });

    it('should override default error message', inject(function($controller, $rootScope, i18n) {
      // Step: a simple stub of the i18n service which returns a different message
      sinon.stub(i18n, 'resolve').returns('Formatul e-mail nevalida');

      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });


      // Step: let's make sure scope.error is undefined before we call #login()
      expect(scope.error).to.be.undefined;

      scope.valid = false;
      scope.login();

      expect(scope.error).to.be.eq("Formatul e-mail nevalida");
    }));

  })


  describe("Valid username and password format", function () {

    beforeEach(function () {
      module('testangular', function ($provide) {
        $provide.value("LoginService", { login: function() {}});
      });
    });

    it('should still result in error if user is not authenticated', inject(function ($controller, $rootScope, LoginService) {

      // Step: this stub makes sure that callback function,
      // which is the third argument of the LoginService#login() function),
      // is called be the arguments necessary for our test
      sinon.stub(LoginService, "login").callsArgWith(2, new Error("Invalid username or password"));

      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.username = "test";
      scope.password = "1234";

      scope.valid = true;

      scope.login();

      expect(scope.error).to.be.eq("Invalid username or password");
    }));

    it('should broadcast success if user is authenticated', inject(function ($controller, $rootScope, LoginService) {

      // Step: we can use stub#yields() instead of callsArgWith to get a cleaner code
      sinon.stub(LoginService, "login").yields(null, {});

      // Step: let's define a simple spy. Spies do not mock behavior, only capture calls.
      var successHandler = sinon.spy();

      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      scope.username = "test";
      scope.password = "1234";
      scope.valid = true;

      // Step: register the spy as the handler of the broadcast event
      $rootScope.$on("LoginController.successful", successHandler);

      scope.login();

      // Step: use the sinon-chai extension to set expectations on sinon spies
      expect(successHandler).to.be.called;
    }));
  });
});