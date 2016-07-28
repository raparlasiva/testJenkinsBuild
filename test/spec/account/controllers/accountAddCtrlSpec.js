'use strict';

describe('account add Ctrl', function () {
  var state;
  var httpBackend;
  var envUrl;
  var ctrlConstructor;
  beforeEach(module('account.module'));
  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    envUrl = environmentSvc.baseUrl('dev');
    httpBackend = $httpBackend;
    state = {
      go: sinon.stub()
    };
    ctrlConstructor = function () {
      return $controller('accountAddCtrl', {$state: state});
    };
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  describe('customerAddInitialization -', function () {
    it('when Customer frm Data is saved - expect a POST url', function () {
      httpBackend.expectPOST(envUrl + '/accounts').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      var ctrl = ctrlConstructor();
      ctrl.saveData({$invalid: false, $dirty: true});
      httpBackend.flush();
    });
    it('should NOT go to customer state when frm is invalid', function() {
      var ctrl = ctrlConstructor();
      ctrl.saveData({});
      state.go.should.not.have.been.called
    });
    it('should go to account state when frm is valid and dirty is true', function() {
      httpBackend.expectPOST(envUrl + '/accounts').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      var ctrl = ctrlConstructor();
      ctrl.saveData({$invalid: false, $dirty: true});
      httpBackend.flush();
      state.go.should.have.been.calledWith('tmw.layout.account');
    });
  });
});

