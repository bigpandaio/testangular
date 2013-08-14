// Step: Define top level describe

describe('Email validator directive tests', function () {

  // Step: set expect and beforeEach

  var expect = chai.expect;

  beforeEach(function () {
    module('testangular');
  });

  // Step: Create the html text
  var html = '<input email-validator type="text" />';

  var scope;

  var element;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.valid = false;

    // Compile the HTML and link the scope.
    var link = $compile(html);
    element = link(scope);
  }));


  // Step: 1st test of the directive - changing value and triggering event

  describe('Invalid Email', function() {

    // Step: Another test with an invalid value

    it('should be invalid if username isn\'t an email', function() {

      // Set the value of the element
      element.val("invalid-email");

      // Trigger the event to allow the directive to recalculate the value
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

      expect(scope.valid).to.be.true;
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