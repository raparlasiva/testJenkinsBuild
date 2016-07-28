'use strict';

describe('credential Add Edit Ctrl', function () {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('credential.module'));beforeEach(module('account.module'));
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
            return $controller('credentialAddEditCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe(' AddEditCtrl  Initialization  -', function() {
        it('should call account api in credential ADD state ', function() {
            state.current = {name : 'tmw.layout.credential.add'};
            httpBackend.expectGET(envUrl + '/accounts/126').respond(
                { data: [{id: 123, accountName: 'test'}]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.frmData.account.should.deep.equal({id: 123, accountName: 'test'});
            ctrl.frmData.validFrom.should.deep.equal(new Date(new Date().getFullYear(), 0, 1));
            ctrl.frmData.validTo.should.deep.equal(new Date(2049,11,31));
        });
        it('should call credential api in credential EDIT state', function() {
            stateParams.credentialId = 132;
            state.current = {name : 'tmw.layout.credential.edit'};
            httpBackend.expectGET(envUrl + '/accounts/126/credentials/132').respond(
                { data: [{id: 123,
                    username: 'test',
                    validFrom: '2015-01-23T18:25:43.511Z',
                    validTo: '2015-04-23T18:25:43.511Z'
                }]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.frmData.validFrom.should.deep.equal(new Date('2015-01-23T18:25:43.511Z'));
            ctrl.frmData.validTo.should.deep.equal(new Date('2015-04-23T18:25:43.511Z'));
        });
        it('format, dateOptions and DatePickerStatus Initialized', function() {
            stateParams.credentialId = 132;
            state.current = {name : 'tmw.layout.credential.edit'};
            httpBackend.expectGET(envUrl + '/accounts/126/credentials/132').respond(
                { data: [{id: 123,
                    username: 'test',
                    validFrom: '2015-01-23T18:25:43.511Z',
                    validTo: '2015-04-23T18:25:43.511Z'
                }]}
            );
            var ctrl = ctrlConstructor();
            httpBackend.flush();

            ctrl.format.should.equal('MM/dd/yyyy');
            ctrl.dateOptions.should.deep.equal({formatYear: 'yy', startingDay: 1});
            ctrl.datePickerStatus.should.deep.equal({validFromOpened: false, validToOpened: false});
        });
    });
    describe('when validFrom and validTo is changed', function() {
        beforeEach(function() {
            stateParams.credentialId = 132;
            state.current = {name : 'tmw.layout.credential.edit'};
            httpBackend.expectGET(envUrl + '/accounts/126/credentials/132').respond(
                { data: [{id: 123,
                    username: 'test',
                    validFrom: '2015-01-23T18:25:43.511Z',
                    validTo: '2015-04-23T18:25:43.511Z'
                }]}
            );

        });
        it('when validFrom date is changed', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.validFromChg();
            ctrl.datePickerStatus.validFromOpened.should.equal(true);
        });

        it('when validTo date is changed', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.validToChg();
            ctrl.datePickerStatus.validToOpened.should.equal(true);
        });


    });
    describe('when credential is updated', function() {
        beforeEach(function() {
            stateParams.credentialId = 132;
            state.current = {name : 'tmw.layout.credential.edit'};
            httpBackend.expectGET(envUrl + '/accounts/126/credentials/132').respond(
                { data: [{id: 123,
                    username: 'test',
                    validFrom: '2015-01-23T18:25:43.511Z',
                    validTo: '2015-04-23T18:25:43.511Z'
                }]}
            );

        });
        it('should make a PUT request and call tmw.layout.credential state when update is done', function() {
            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectPUT(envUrl + '/accounts/126/credentials/132').respond(
                { response: 'someData'}
            );
            ctrl.saveData({$invalid: false, $dirty: true});
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.credential');
        });
    });

    describe('when credential is inserted', function() {
        beforeEach(function() {
            stateParams.accountId = 126;
            state.current = {name : 'tmw.layout.credential.add'};
            httpBackend.expectGET(envUrl + '/accounts/126').respond(
                { data: [{id: 123,
                    username: 'test'
                }]}
            );

        });
        it('should make a POST request and call tmw.layout.credential state when insert is done', function() {

            var ctrl = ctrlConstructor();
            httpBackend.flush();
            httpBackend.expectPOST(envUrl + '/accounts/126/credentials').respond(
                { response: 'someData'}
            );
            ctrl.saveData({$invalid: false, $dirty: true});
            httpBackend.flush();
            state.go.should.have.been.calledWith('tmw.layout.credential');
        });
    });

});

