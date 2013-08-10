app.controller('LoginController', ['$scope', function($scope) {

  // Step: 1 Just the controller

  // Step 4: Add the properties.
  $scope.username = null;
  $scope.password = null;
  $scope.valid = false;


  // Step 5: Add the function without functionallity

//  $scope.login = function() {
//  }

  // Step 7: Add basic login check for values
  $scope.login = function() {
    if (!$scope.valid) {
      $scope.error = "Please fill in all fields";
    }
  };

  // Step 11: Add LoginService
  // app.controller('LoginController', ['$scope', 'loginService', function($scope, loginService) {
  // Step 12: Add logic for calling service

//  $scope.login = function() {
//    if (!$scope.valid) {
//      $scope.error = "Please fill in all fields";
//
//    } else {
//      // TODO - submitting class ?
//
//      loginService.login($scope.username, $scope.password);
//    }
//  };

  // Step 14: Add full logic of using the promise

//  loginService.login($scope.username, $scope.password).then(
//      function() {
//        // broadcast login ??
//      },
//      function() {
//        // set error to invalid user name / password
//      }
  );



}])
