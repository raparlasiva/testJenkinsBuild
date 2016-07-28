'use strict';

describe('fault Ctrl', function () {
  var state, stateParams;
  var httpBackend;
  var envUrl;
  var ctrlConstructor;
  beforeEach(module('fault.module'));
  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    envUrl = environmentSvc.baseUrl('dev');
    httpBackend = $httpBackend;
    stateParams = {vehicleId: 123, accountId: 321};
    state = {
      go: sinon.stub()
    };
    httpBackend.expectGET(envUrl + '/accounts/321/assets/123/faults?pageId=1').respond(
      {data: [{code: 1, asset: {description: 'vehicleDescription'}}],
        responseDescription: { totalHits: 1}}
    );
    ctrlConstructor = function() {
      return $controller('faultCtrl', {$state: state, $stateParams: stateParams});
    };
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  describe('faultInitialization -', function () {
    it('when faultCtrl is initially created - expect a GET url', function () {
      var ctrl = ctrlConstructor();
      ctrl.currentPage.should.equal(1);
      httpBackend.flush();
      ctrl.vehicleDescription.should.equal('vehicleDescription');
      ctrl.data.should.deep.equal([{code: 1, asset: {description: 'vehicleDescription'}}]);
      ctrl.totalHits.should.equal(1);
    });
    it('sort and reverse state maintained even after change in pagination - expect a GET url', function () {
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      httpBackend.expectGET(envUrl + '/accounts/321/assets/123/faults?pageId=1&sort=colName').respond(
        { data: [{code: 1, asset: {description: 'vehicleDescription'}}], responseDescription: {totalHits: 100}}
      );
      ctrl.getData({sortType: 'colName'});
      httpBackend.flush();

      ctrl.currentPage = 12; // change in pagination
      ctrl.paginationChanged(); //call

      //sort and reverse state maintained even after change in pagination
      httpBackend.expectGET(envUrl + '/accounts/321/assets/123/faults?pageId=12&sort=colName').respond(
        { data: [{code: 1, asset: {description: 'vehicleDescription'}}], responseDescription: {totalHits: 100}}
      );
      httpBackend.flush();
      ctrl.vehicleDescription.should.equal('vehicleDescription');
      ctrl.data.should.deep.equal([{code: 1, asset: {description: 'vehicleDescription'}}]);
      ctrl.totalHits.should.equal(100);
    });
  });
});
