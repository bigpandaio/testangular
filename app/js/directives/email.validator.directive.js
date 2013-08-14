// Step: Start with the directive declaration

app.directive('emailValidator', function() {

  // Step: The validation function
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return {
    restrict:'A',

    // Step: Create the link function
    link: function(scope, element) {

      scope.valid = false;

      // Step: Bind the element for checking username content

      element.bind('input', function() {

        var value = element.val();

        // Step: Run the change inside an $apply loop
        scope.$apply(function() {
          scope.valid = validateEmail(value);
        })
      });
    }
  }
});