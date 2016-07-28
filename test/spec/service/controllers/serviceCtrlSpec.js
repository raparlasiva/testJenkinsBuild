'use strict';

describe('service Ctrl', function () {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('service.module', 'credential.module'));
    beforeEach(inject(function($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {accountId: 123, credentialId: 321,
            credentialData: {account: {id: '1'},
            services: [{action: {create:true, read:true, update:false, delete:false}, id: 1223, url: 'fault'}]}
        };
        state = {
            go: sinon.stub()
        };

        ctrlConstructor = function () {
            return $controller('serviceCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('serviceInitialization -', function () {
        it('when serviceCtrl is initially created- and the stateParams has the services defined inside credentialData', function () {
            var ctrl = ctrlConstructor();
            ctrl.currentPage.should.equal(1);
            ctrl.credentialData.should.deep.equal({account: {id: '1'},
                services: [{action: {create:true, read:true, update:false, delete:false}, id: 1223, url: 'fault'}]})
            ctrl.data.should.deep.equal([{action: {create:true, read:true, update:false, delete:false}, id: 1223, url: 'fault'}]);
            ctrl.totalHits.should.equal(1);
        });
        it('should call credential api when credentialData of stateParams is empty', function () {
            stateParams.credentialData = {};
            httpBackend.expectGET(envUrl + '/accounts/123/credentials/321').respond(
                {data: [{accountId: 123, credentialId: 321, account: {id: '1'},
                    services: [{action: {create:true, read:true, update:false, delete:false}, id: 1223, url: 'fault'}]}]
                }
            );

            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.credentialData.should.deep.equal({accountId: 123, credentialId: 321, account: {id: '1'},
                services: [{action: {create:true, read:true, update:false, delete:false}, id: 1223, url: 'fault'}]});
        });
        it('should call the default services api when no services are available in credential', function () {
            stateParams.credentialData.services = [];
            httpBackend.expectGET(envUrl + '/services?pageId=1').respond(
                {
                    data: 'some response',
                    responseDescription: {totalHits: 1}
                }

            );

            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.data.should.equal('some response');
            ctrl.totalHits.should.equal(1);
        });
        it('sort and reverse state maintained even after change in pagination - expect a GET url', function () {
            var ctrl = ctrlConstructor();
            //httpBackend.flush();
            httpBackend.expectGET(envUrl + '/services?pageId=1&sort=colName').respond(
                { data: 'someData', responseDescription: {totalHits: 100}}
            );
            ctrl.getData({sortType: 'colName'});
            httpBackend.flush();

            httpBackend.expectGET(envUrl + '/services?pageId=12&sort=colName').respond(
                { data: [{customer: 'someCustomerData', serviceData: 1223}],  responseDescription: {totalHits: 100}}
            );

            ctrl.paginationChanged(12); //call

            //sort and reverse state maintained even after change in pagination
            httpBackend.flush();
            ctrl.data.should.deep.equal([{customer: 'someCustomerData', serviceData: 1223}]);
            ctrl.totalHits.should.equal(100);
        });
    });
    describe('when credential is updated', function() {
        it('should make a PUT request and call tmw.layout.credential state when update is done', function() {
            var ctrl = ctrlConstructor();

            httpBackend.expectPUT(envUrl + '/accounts/123/credentials/321').respond(
                { response: 'someData'}
            );
            ctrl.saveData();
            ctrl.credentialData.services.should.deep.equal([{action: {create:true, read:true, update:false, delete:false}, id: 1223, url: 'fault'}]);
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.credential', {accountId: '1'});


        });
    });
});

