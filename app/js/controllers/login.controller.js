app.controller('LoginController', ['$scope', 'LoginService', function($scope, loginService) {

  $scope.login = function() {
    loginService.login("shahar@bigpanda.io", "testangular").then(function() {
      console.log('success');
    }, function() {
      console.log('error');
    })
  }

}])
