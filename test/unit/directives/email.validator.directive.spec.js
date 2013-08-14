// Step: Define top level describe

describe('Email validator directive tests', function () {



  var expect = chai.expect;

  // Step: Like in other test frameworks we are able to run code before
  // each test
  beforeEach(function () {
    // each angular app define its module -
    // This is how we load the relevant app to be used later in injections
    module('testangular');
  });

  // Step: Create the html text
  var html = '<input email-validator type="text" />';

  var scope;

  var element;

  // Step: Inject function - use the rootScope and compile service to create
  // test objects
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.valid = false;

    // Compile the HTML and link the scope.
    var link = $compile(html);
    element = link(scope);
  }));


  // Step: 1st test of the directive - changing value and triggering event

  describe('Invalid Email', function() {

    it('should be invalid if username isn\'t an email', function() {

      // Step - Set the value of the element
      element.val("invalid-email");

      // Step - Trigger the event to allow the directive to recalculate the value
      element.triggerHandler("input");

      // Step: Expecting valid scope property to be false
      expect(scope.valid).to.be.false;
    });
  });


  // Step: A Valid email test

  describe('Valid email', function() {

    it('should be valid if email entered', function() {

      element.val("sheldon@bigpanda.io");

      element.triggerHandler("input");

      expect(scope.valid).to.be.false;
    });


    // Step: validating triggering of a watch loop

    it("should trigger a watch change event on the valid property", function() {
      var watchCalled = false;

      // Directive execute validation inside an $apply loop - should trigger the change
      scope.$watch("valid", function() {
        watchCalled = true;
      });

      element.val("sheldon@bigpanda.io");
      element.triggerHandler("input");

      expect(watchCalled).to.be.true;
    });
  });

});