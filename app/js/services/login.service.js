app.service('LoginService', ['$http', '$q', function ($http, $q) {

  this.login = function (username, password, callback) {
    var deferred = $q.defer();

    // Step: how we use $http to post a request to our server
    var futureResponse = $http.post('http://localhost:8000/login', {username: username, password: password});


    futureResponse.then(function () {
      deferred.resolve({});
    }, function (response) {
      if (response.status == 401) {

        // Step: in case of HTTP 401, we return an error
        deferred.reject(new Error("Invalid username or password"));

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
