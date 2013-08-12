//app.controller('LoginController', ['$rootScope','$scope', function($rootScope, $scope) {
app.controller('LoginController', ['$rootScope', '$scope', 'LoginService', function($rootScope, $scope, loginService) {

  // Step: 1 Just the controller

  // Step 4: Add the properties.
  $scope.username = null;
  $scope.password = null;
  $scope.error = null;

  // Step 5: Add the function without functionallity

//  $scope.login = function() {
//  }

  // Step 7: Add basic login check for values
//  $scope.login = function() {
//    if (!$scope.valid) {
//      $scope.error = "Please fill in all fields";
//    }
//  };

  // Step 11: Add LoginService
  // app.controller('LoginController', ['$rootScope', '$scope', 'LoginService', function($scope, loginService) {
  // Step 12: Add logic for calling service

  $scope.login = function() {
    if (!$scope.valid) {
      $scope.error = "Invalid email format";

    } else {
      // TODO - submitting class ?

      $scope.error = null;
      $scope.success = null;


      loginService.login($scope.username, $scope.password, function(error, data) {
        if (error) {
          $scope.error = error.message;
        }


        // Step 14 - Add event call for success
        else {
          $scope.success = "hurray!";
          $rootScope.$broadcast("LoginController.successful");
        }
      });
    }
  };
}]);
