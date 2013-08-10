describe('Signin validator directive tests', function () {


  // Steps:

  // Step 1: Just the describe line

  // Step 2: Add before each with module, inject expect

  var inject = angular.mock.inject;
  var module = angular.mock.module;
  var expect = chai.expect;


  beforeEach(function () {
    module('testangular');
  });

  // Step 3: Create the html text
  var html = '<form signin-validator><input type="text" ng-model="username">';

  // Step 3-1: Scope creation and compile

  var scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.valid = false;

    // Compile the HTML and link to the scope.
    var compiled = $compile(html);
    compiled(scope);
  }));


  // Step 4: mark the form as invalid if nothing inserted

  describe('Invalid values', function() {

    it('Should be invalid if nothing entered', function() {

      // Scope changed whould have been placed here.

      scope.$digest();

      expect(scope.valid).to.be.eq(false);
    });


    // Step 5: Add additional test
    it('Should be invalid if username isn\'t an email', function() {

      scope.username = "test";

      scope.$digest();

      expect(scope.valid).to.be.eq(false);
    });
  });


  // Step 6: Add more test for valid

  describe('Valid email', function() {

    it('Should be valid if email entered', function() {

      scope.username = "sheldon@bigpanda.io";

      scope.$digest();

      expect(scope.valid).to.be.eq(true);
    });
  });

});