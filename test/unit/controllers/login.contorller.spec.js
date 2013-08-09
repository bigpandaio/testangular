describe('Login controller tests', function () {

  var inject = angular.mock.inject;
  var module = angular.mock.module;
  var expect = chai.expect;

  beforeEach(function () {
    module('testangular', function($provide) {
      $provide.value('LoginService', {});
    });
  });

  describe('#login', function() {

    it('should call LoginService#login', inject(['$controller', '$rootScope', function($controller, $rootScope) {
      var scope = $rootScope.$new();
      $controller("LoginController", { $scope: scope });

      expect(1).to.eql(1);
    }]))
  })


});