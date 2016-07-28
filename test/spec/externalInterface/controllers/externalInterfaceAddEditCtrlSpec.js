'use strict';

describe('externalInterface Add Edit Ctrl', function () {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('externalInterface.module'));beforeEach(module('account.module'));
    beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {
            accountId: 126
        };
        state = {
            go: sinon.stub(),
        };

        ctrlConstructor = function() {
            return $controller('externalInterfaceAddEditCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe(' AddEditCtrl  Initialization  -', function() {
        it('should call account api in externalInterface ADD state ', function() {
            state.current = {name : 'tmw.layout.externalInterface.add'};
            httpBackend.expectGET(envUrl + '/accounts/126').respond(
                { data: [{id: 123, accountName: 'test'}]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.frmData.account.should.deep.equal({id: 123, accountName: 'test'});
        });
        it('should call externalInterface api in externalInterface EDIT state', function() {
            stateParams.externalInterfaceId = 132;
            state.current = {name : 'tmw.layout.externalInterface.edit'};
            httpBackend.expectGET(envUrl + '/accounts/126/interfaces/132').respond(
                { data: [{id: 123,
                    username: 'test', password:'123', type: 'Rest', url: 'some Url'
                }]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();
        });
    });

    describe('when type is set to Rest vs Soap', function() {
        beforeEach(function() {
            stateParams.externalInterfaceId = 132;
            state.current = {name : 'tmw.layout.externalInterface.edit'};
        });
        it('should set wsdl to null when type is Rest', function() {
            httpBackend.expectGET(envUrl + '/accounts/126/interfaces/132').respond(
                { data: [{id: 123,
                    username: 'test', password:'123', type: 'Soap', wsdl: 'some wsdl', url: 'some Url'
                }]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectPUT(envUrl + '/accounts/126/interfaces/132').respond(
                { response: 'someData'}
            );

            ctrl.frmData.type = 'Rest';
            ctrl.saveData({$invalid: false, $dirty: true});
            should.equal(ctrl.frmData.wsdl, null);
            httpBackend.flush();
        });

        it('should set wsdl to null when type is Rest', function() {
            httpBackend.expectGET(envUrl + '/accounts/126/interfaces/132').respond(
                { data: [{id: 123,
                    username: 'test', password:'123', type: 'Rest', wsdl: 'some wsdl', url: 'some Url'
                }]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectPUT(envUrl + '/accounts/126/interfaces/132').respond(
                { response: 'someData'}
            );
            ctrl.frmData.type = 'Soap';

            ctrl.saveData({$invalid: false, $dirty: true});
            should.not.equal(ctrl.frmData.wsdl, null);
            httpBackend.flush();
        });
    });

    describe('when externalInterface is updated', function() {
        beforeEach(function() {
            stateParams.externalInterfaceId = 132;
            state.current = {name : 'tmw.layout.externalInterface.edit'};
            httpBackend.expectGET(envUrl + '/accounts/126/interfaces/132').respond(
                { data: [{id: 123,
                        username: 'test', password:'123', type: 'Rest', wsdl: 'some wsdl', url: 'some Url'
                }]}
            );

        });
        it('should make a PUT request and call tmw.layout.externalInterface state when update is done', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectPUT(envUrl + '/accounts/126/interfaces/132').respond(
                { response: 'someData'}
            );

            ctrl.saveData({$invalid: false, $dirty: true});
            should.equal(ctrl.frmData.wsdl, null);
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.externalInterface');
        });
    });

    describe('when externalInterface is inserted', function() {
        beforeEach(function() {
            stateParams.accountId = 126;
            state.current = {name : 'tmw.layout.externalInterface.add'};
            httpBackend.expectGET(envUrl + '/accounts/126').respond(
                { data: [{id: 123,
                    username: 'test'
                }]}
            );

        });
        it('should make a POST request and call tmw.layout.externalInterface state when insert is done', function() {

            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectPOST(envUrl + '/accounts/126/interfaces').respond(
                { response: 'someData'}
            );
            ctrl.saveData({$invalid: false, $dirty: true});
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.externalInterface');
        });
    });

});

