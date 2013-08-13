app.controller('LoginController', ['$rootScope', '$scope', 'LoginService', 'i18n', function($rootScope, $scope, loginService, i18n) {

  $scope.login = function() {

    // Set error with a message in case the valid flag is false. Notice that the directive sets the
    // valid flag to true or false according to the validity of the email address.
    if (!$scope.valid) {
      $scope.error = i18n.resolve("Invalid email format");

    }

    else {
      $scope.error = null;
      $scope.success = null;

      loginService.login($scope.username, $scope.password, function(error) {
        if (error) {
          $scope.error = i18n.resolve(error.message)
        } else {
          $scope.success = i18n.resolve("hurray!");
          $rootScope.$broadcast("LoginController.successful");
        }
      });
    }
  };
}]);
