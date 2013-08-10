app.service('LoginService', ['$http', '$q', function ($http, $q) {

  this.login = function (username, password, callback) {
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

    // If a callback function was passed, make sure the
    // promise resolution is delegated to the callback
    if (callback && typeof callback === 'function') {
      deferred.promise.then(function(data) {
        callback(null, data);
      }, function(error) {
        callback(error);
      });
    }

    return deferred.promise;
  }

}])
