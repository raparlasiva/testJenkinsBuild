'use strict';

describe('directive:alert-message', function() {
  var scope, element, alertingSvc;

  beforeEach(module('tmwGlobals', 'views/alertMessage.html'));


  beforeEach(inject(function($rootScope, _alertingSvc_) {
    scope = $rootScope.$new();
    alertingSvc = _alertingSvc_;
  }));

  describe('Setup for templateUrl', function() {
    beforeEach(inject(function($compile) {
      alertingSvc.addDanger('some danger message');
      element = angular.element('<alert-message></alert-message>');
      $compile(element)(scope)
      scope.$digest();
    }));

    it('parent element length should be 1', function() {
      var divEle = element.find('div');
      divEle.length.should.equal(1);
    });

    it('isolate scope.alerts equal to alertingSvc.alerts', function() {
      element.isolateScope().alerts.should.equal(alertingSvc.alerts);
    });

    it('should remove alerts when closeAlert is called', function() {
      element.isolateScope().closeAlert(0);
      element.isolateScope().alerts.should.deep.equal([]);
    });

  });
});

