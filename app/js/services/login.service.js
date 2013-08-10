app.service('LoginService', ['$http', '$q', function ($http, $q) {

  this.login = function (username, password) {
    var deferred = $q.defer();

    var futureResponse = $http.post('http://localhost:3000/login', {username: username, password: password});
    futureResponse.then(function () {
      deferred.resolve({});
    }, function (response) {
      if (response.status == 401) {
        deferred.reject("Invalid username or password");
      } else {
        deferred.reject(response.data);
      }
    })

    return deferred.promise;
  }

}])
