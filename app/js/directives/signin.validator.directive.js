// Step 0: create the basic skeleton

app.directive('signinValidator', function() {
  return {
    restrict:'A',

    link: function(scope) {

      scope.valid = false;

      // Step 7: Add logic for checking username content

      scope.$watch('username', function(value) {
        scope.valid = validateEmail(value);
      });

      function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    }
  }
});