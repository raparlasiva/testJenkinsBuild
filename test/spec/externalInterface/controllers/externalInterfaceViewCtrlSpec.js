'use strict';

describe('externalInterface View Ctrl', function() {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('externalInterface.module'));
    beforeEach(inject(function($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {accountId: 126, externalInterfaceId: 321};
        state = {
            go: sinon.stub()
        };

        ctrlConstructor = function() {
            return $controller('externalInterfaceViewCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('externalInterfaceViewInitialization -', function() {
        it('should call externalInterface api when externalInterface view ctrl is called', function() {
            httpBackend.expectGET(envUrl + '/accounts/126/interfaces/321').respond({ data: [{id: 'getData'}]});

            var ctrl = ctrlConstructor();
            httpBackend.flush();
            ctrl.data.should.deep.equal({'id':'getData'});
        });
    });
});

