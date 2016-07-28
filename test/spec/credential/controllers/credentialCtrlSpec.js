'use strict';

describe('credential Ctrl', function () {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('credential.module'));
    beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {accountId: 123};
        state = {
            go: sinon.stub()
        };
        httpBackend.expectGET(envUrl + '/accounts/123/credentials?pageId=1').respond(
            {data: [{account: 'someCustomerData', credentialData: 1223}], responseDescription: { totalHits: 1}}
        );
        ctrlConstructor = function () {
            return $controller('credentialCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('credentialInitialization -', function () {
        it('when credentialCtrl is initially created- expect a GET url with credential', function () {
            stateParams.accountData = {id: '124', name: 'account'};
            var ctrl = ctrlConstructor();
            ctrl.deleting.should.deep.equal({});
            ctrl.currentPage.should.equal(1);
            httpBackend.flush();
            ctrl.data.should.deep.equal([{account: 'someCustomerData', credentialData: 1223}]);
            ctrl.accountData.should.deep.equal({id: '124', name: 'account'});
            ctrl.totalHits.should.equal(1);
        });
        it('sort and reverse state maintained even after change in pagination - expect a GET url', function () {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectGET(envUrl + '/accounts/123/credentials?pageId=1&sort=colName').respond(
                { data: 'someData', responseDescription: {totalHits: 100}}
            );
            ctrl.getData({sortType: 'colName'});
            httpBackend.flush();

            ctrl.currentPage = 1; // change in pagination
            ctrl.paginationChanged(12); //call

            //sort and reverse state maintained even after change in pagination
            httpBackend.expectGET(envUrl + '/accounts/123/credentials?pageId=12&sort=colName').respond(
                { data: [{account: 'someCustomerData', credentialData: 1223}],  responseDescription: {totalHits: 100}}
            );
            httpBackend.flush();
            ctrl.data.should.deep.equal([{account: 'someCustomerData', credentialData: 1223}]);
            ctrl.accountData.should.equal('someCustomerData');
            ctrl.totalHits.should.equal(100);
        });
    });
    describe('add credential -', function() {
        it('when add crdential is called', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.add();
            state.go.should.have.been.calledWith('tmw.layout.credential.add', {accountId: 123});
        });
    });
    describe('edit credential -', function() {
        it('when edit crdential is called', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.edit({id:232});
            state.go.should.have.been.calledWith('tmw.layout.credential.edit', {credentialId: 232});
        });
    });
    describe('delete credential -', function() {
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
            httpBackend.expectDELETE(envUrl + '/accounts/123/credentials/132').respond('ok');
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.credential', {}, {reload: true});
        });
    });
});

