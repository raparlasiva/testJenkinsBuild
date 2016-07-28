'use strict';

describe('credential View Ctrl', function() {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('credential.module'));
    beforeEach(inject(function($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {accountId: 126, credentialId: 321, credentialData: {}};
        state = {
            go: sinon.stub()
        };

        ctrlConstructor = function() {
            return $controller('credentialViewCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('credentialViewInitialization -', function() {
        it('should call credential api when credential view ctrl is called', function() {
            stateParams.credentialData = {};
            httpBackend.expectGET(envUrl + '/accounts/126/credentials/321').respond({ data: [{id: 'getData'}]});

            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.data.should.deep.equal({'id':'getData'});
        });
    });
});

