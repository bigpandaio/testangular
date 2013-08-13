app.controller('LoginController', ['$rootScope', '$scope', 'LoginService', function($rootScope, $scope, loginService) {

  $scope.username = null;
  $scope.password = null;
  $scope.error = null;

  $scope.login = function() {
    if (!$scope.valid) {
      $scope.error = "Invalid email format";

    } else {
      $scope.error = null;
      $scope.success = null;

      loginService.login($scope.username, $scope.password, function(error) {
        if (error) {
          $scope.error = error.message;
        } else {
          $scope.success = "hurray!";
          $rootScope.$broadcast("LoginController.successful");
        }
      });
    }
  };
}]);
