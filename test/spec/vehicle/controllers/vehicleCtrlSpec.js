'use strict';

describe('vehicle Ctrl', function () {
  var state, stateParams;
  var httpBackend;
  var envUrl;
  var ctrlConstructor;
  beforeEach(module('vehicle.module'));
  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    envUrl = environmentSvc.baseUrl('dev');
    httpBackend = $httpBackend;
    stateParams = {accountId: 123};
    state = {
      go: sinon.stub()
    };
    httpBackend.expectGET(envUrl + '/accounts/123/assets?pageId=1').respond(
      {data: [{account: 'someCustomerData', vehicleData: 1223}], responseDescription: { totalHits: 1}}
    );
    ctrlConstructor = function () {
      return $controller('vehicleCtrl', {$state: state, $stateParams: stateParams});
    };
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  describe('vehicleInitialization -', function () {
    it('when vehicleCtrl is initially created- expect a GET url with asset', function () {
      var ctrl = ctrlConstructor();
      ctrl.currentPage.should.equal(1);
      httpBackend.flush();
      ctrl.accountId.should.equal(123);
      ctrl.data.should.deep.equal([{account: 'someCustomerData', vehicleData: 1223}]);
      ctrl.totalHits.should.equal(1);
    });
    it('sort and reverse state maintained even after change in pagination - expect a GET url', function () {
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      httpBackend.expectGET(envUrl + '/accounts/123/assets?pageId=1&sort=colName').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      ctrl.getData({sortType: 'colName'});
      httpBackend.flush();
      ctrl.paginationChanged(12); //call

      //sort and reverse state maintained even after change in pagination
      httpBackend.expectGET(envUrl + '/accounts/123/assets?pageId=12&sort=colName').respond(
        { data: [{account: 'someCustomerData', vehicleData: 1223}],  responseDescription: {totalHits: 100}}
      );
      httpBackend.flush();
      ctrl.data.should.deep.equal([{account: 'someCustomerData', vehicleData: 1223}]);
      ctrl.accountData.should.equal('someCustomerData');
      ctrl.totalHits.should.equal(100);
    });
    it('should go to tmw.layout.vehicle.add state when add method is called', function() {
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      ctrl.add();
      state.go.should.have.been.calledWith('tmw.layout.vehicle.add', {accountData: 'someCustomerData'});
    });
  });
});

