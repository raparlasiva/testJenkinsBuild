'use strict';

describe('account Ctrl', function () {
  var state, stateParams;
  var httpBackend;
  var envUrl;
  var ctrlConstructor;
  beforeEach(module('account.module'));
  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    envUrl = environmentSvc.baseUrl('dev');
    httpBackend = $httpBackend;

    state = {
      go: sinon.stub(),
      current: {data:{pageId: 1}}
    };

    stateParams= {}
    httpBackend.expectGET(envUrl + '/accounts?pageId=1').respond(
      {data: 'someData', responseDescription: { totalHits: 1}}
    );
    ctrlConstructor = function () {
      return $controller('accountCtrl', {$state: state, $stateParams: stateParams});
    };
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  describe('accountInitialization -', function () {
    it('when accountCtrl is initially created - expect a GET url', function () {
      var ctrl = ctrlConstructor();
      ctrl.currentPage.should.equal(1);
      httpBackend.flush();
      ctrl.data.should.equal('someData');
      ctrl.totalHits.should.equal(1);
    });
    it('should call the current state and update stateParams when pagination is changed', function (){
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      httpBackend.expectGET(envUrl + '/accounts?pageId=12&sort=').respond(
          { data: 'someData', responseDescription: {totalHits: 100}}
      );

      ctrl.paginationChanged(12); //call
      httpBackend.flush();
      state.current.data.pageId.should.equal(12);
      state.go.should.have.been.calledWith('tmw.layout.account');
    });
    it('sort and reverse state maintained even after change in pagination - expect a GET url', function () {
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      httpBackend.expectGET(envUrl + '/accounts?pageId=1&sort=colName').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      ctrl.getData({sortType: 'colName'});
      httpBackend.flush();
      ctrl.paginationChanged(12); //call

      //sort and reverse state maintained even after change in pagination
      httpBackend.expectGET(envUrl + '/accounts?pageId=12&sort=colName').respond(
        { data: 'someData', responseDescription: {totalHits: 100}}
      );
      httpBackend.flush();
      ctrl.data.should.equal('someData');
      ctrl.totalHits.should.equal(100);
    });
    it('sort column changed appropriately in the url when the sort has changed', function() {
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      httpBackend.expectGET(envUrl + '/accounts?pageId=1&sort=-colName').respond(
          { data: 'someData', responseDescription: {totalHits: 100}}
      );
      ctrl.getData({sortType: '-colName'});
      httpBackend.flush();

      httpBackend.expectGET(envUrl + '/accounts?pageId=1&sort=colName').respond(
          { data: 'someData', responseDescription: {totalHits: 100}}
      );
      ctrl.getData({sortType: 'colName'});
      httpBackend.flush();
    });
    it('should go to tmw.layout.account.add state when add method is called', function() {
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      ctrl.add();
      state.go.should.have.been.calledWith('tmw.layout.account.add');
    });
  });
});

