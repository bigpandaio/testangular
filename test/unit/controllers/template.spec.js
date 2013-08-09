describe('Boilerplate', function() {

  var inject = angular.mock.inject;
  var module = angular.mock.module;
  var expect = chai.expect;

  beforeEach(function() {
    module('testangular', function($provide) {});
  });

  describe('Boilerplate', function() {

    it('test', function() {
      expect(1).to.eql(1);
    })


  });
});