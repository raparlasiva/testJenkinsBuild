'use strict';

describe('externalInterface Ctrl', function () {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('externalInterface.module'));
    beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {accountId: 123};
        state = {
            go: sinon.stub()
        };
        httpBackend.expectGET(envUrl + '/accounts/123/interfaces?pageId=1').respond(
            {data: [{account: 'someCustomerData', externalInterfaceData: 1223}], responseDescription: { totalHits: 1}}
        );
        ctrlConstructor = function () {
            return $controller('externalInterfaceCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('externalInterfaceInitialization -', function () {
        it('when externalInterfaceCtrl is initially created- expect a GET url with externalInterface', function () {
            stateParams.accountData = {id: '124', name: 'account'};
            var ctrl = ctrlConstructor();
            ctrl.currentPage.should.equal(1);
            httpBackend.flush();
            ctrl.data.should.deep.equal([{account: 'someCustomerData', externalInterfaceData: 1223}]);
            ctrl.accountData.should.deep.equal({id: '124', name: 'account'});
            ctrl.totalHits.should.equal(1);
        });
        it('sort and reverse state maintained even after change in pagination - expect a GET url', function () {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectGET(envUrl + '/accounts/123/interfaces?pageId=1&sort=colName').respond(
                { data: 'someData', responseDescription: {totalHits: 100}}
            );
            ctrl.getData({sortType: 'colName'});
            httpBackend.flush();

            ctrl.currentPage = 1; // change in pagination
            ctrl.paginationChanged(12); //call

            //sort and reverse state maintained even after change in pagination
            httpBackend.expectGET(envUrl + '/accounts/123/interfaces?pageId=12&sort=colName').respond(
                { data: [{account: 'someCustomerData', externalInterfaceData: 1223}],  responseDescription: {totalHits: 100}}
            );
            httpBackend.flush();
            ctrl.data.should.deep.equal([{account: 'someCustomerData', externalInterfaceData: 1223}]);
            ctrl.accountData.should.equal('someCustomerData');
            ctrl.totalHits.should.equal(100);
        });
    });

    describe('add externalInterface -', function() {
        it('when add externalInterface is called', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.add();
            state.go.should.have.been.calledWith('tmw.layout.externalInterface.add', {accountId: 123});
        });
    });
    describe('edit externalInterface -', function() {
        it('when edit crdential is called', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.edit({id:232});
            state.go.should.have.been.calledWith('tmw.layout.externalInterface.edit', {externalInterfaceId: 232});
        });
    });
    describe('delete externalInterface -', function() {
        it('when confirm delete is called-', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.confirmDelete({id: 'someName'});
            ctrl.deleting.should.deep.equal({'someName': true});

        });
        it('when cancel delete is called-', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.cancelDelete({id: 'someName'});
            ctrl.deleting.should.deep.equal({'someName': false});

        });
        it('when delete crdential is called-', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.delete({id: 132});
            httpBackend.expectDELETE(envUrl + '/accounts/123/interfaces/132').respond('ok');
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.externalInterface', {}, {reload: true});
        });
    });
});

