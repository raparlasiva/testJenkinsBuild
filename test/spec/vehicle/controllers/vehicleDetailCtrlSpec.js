'use strict';

describe('Vehicle Detail Ctrl', function () {
    var state, stateParams;
    var httpBackend;
    var envUrl;
    var ctrlConstructor;
    beforeEach(module('vehicle.module'));
    beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
        envUrl = environmentSvc.baseUrl('dev');
        httpBackend = $httpBackend;
        stateParams = {
            accountId: 126,
            vehicleId: 99
        };
        state = {
            go: sinon.stub()
        };
        ctrlConstructor = function() {
            return $controller('vehicleDetailCtrl', {$state: state, $stateParams: stateParams});
        };
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe(' Controller Init', function() {
        it('should call get vehicle on init ', function() {
            state.current = {name : 'tmw.layout.vehicle'};
            var ctrl = ctrlConstructor();
            httpBackend.expectGET(envUrl + '/accounts/126/assets/99').respond(
              { data: [{id: 123, description: 'test'}]}
            );
            httpBackend.flush();
            ctrl.data.should.deep.equal({id: 123, description: 'test'});
        });
    });
});
