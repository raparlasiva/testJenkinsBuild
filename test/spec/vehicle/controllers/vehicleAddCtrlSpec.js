'use strict';

describe('vehicle add Ctrl', function () {
  var state, stateParams;
  var httpBackend;
  var envUrl;
  var ctrlConstructor;
  beforeEach(module('vehicle.module')); beforeEach(module('account.module'));
  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    envUrl = environmentSvc.baseUrl('dev');
    httpBackend = $httpBackend;
    stateParams = {accountData: 'some account data', accountId: 123};
    state = {
      go: sinon.stub()
    };
    ctrlConstructor = function () {
      return $controller('vehicleAddCtrl', {$state: state, $stateParams: stateParams});
    };
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  describe('vehicleAddInitialization -', function () {
    it('should call account api when page is refreshed as stateParams accountData would be lost', function() {
      stateParams.accountData = {};
      httpBackend.expectGET(envUrl + '/accounts/123').respond(
          { data: [{id: 123, accountName: 'test'}], responseDescription: {totalHits: 100}}
      );
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      ctrl.frmData.account.should.deep.equal({id: 123, accountName: 'test'});
    });
    it('when Vehicle frm Data is saved - expect a POST url and Customer Data is provided', function () {
      httpBackend.expectPOST(envUrl + '/accounts/123/assets').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      var ctrl = ctrlConstructor();

      ctrl.saveData({$invalid: false, $dirty: true});
      ctrl.frmData.id.should.equal(123);
      ctrl.frmData.faults.should.deep.equal([]);
      httpBackend.flush();
    });
    it('should NOT go to vehicle state when frm is invalid', function() {
      var ctrl = ctrlConstructor();
      ctrl.saveData({});
      state.go.should.not.have.been.called;
    });
    it('should go to vehicle state when frm is valid and dirty is true', function() {
      httpBackend.expectPOST(envUrl + '/accounts/123/assets').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      var ctrl = ctrlConstructor();
      ctrl.frmData = {};
      ctrl.saveData({$invalid: false, $dirty: true});
      httpBackend.flush();
      state.go.should.have.been.calledWith('tmw.layout.vehicle');
    });
  });
});

