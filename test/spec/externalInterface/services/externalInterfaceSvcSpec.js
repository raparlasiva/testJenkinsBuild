'use strict';

describe('externalInterfaceSvc service', function() {

    // load modules
    beforeEach(module('externalInterface.module'));

    describe('externalInterfaceSvc defined and able to fetch', function () {
        //Test service availability
        it('check the existence of externalInterfaceSvc factory', inject(function(externalInterfaceSvc) {
            assert.isDefined(externalInterfaceSvc);
            assert.isDefined(externalInterfaceSvc.externalInterface);
        }));

        it('should call externalInterface POST when adding a new externalInterface to an account', inject(function (externalInterfaceSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('POST', environmentSvc.baseUrl('dev') + '/accounts/12/interfaces').respond({data: 'test'});
            externalInterfaceSvc.externalInterface.save({accountId: 12},function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));

        it('should call a single externalInterface with crdentialId (GET method) and respond back with data', inject(function (externalInterfaceSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/12/interfaces').respond({data:'test'});
            externalInterfaceSvc.externalInterface.get({accountId: 12}, function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));
        it('should call all externalInterface  with accountId (GET method) and respond back with data', inject(function (externalInterfaceSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/783/interfaces').respond({data:'test'});
            externalInterfaceSvc.externalInterface.get({accountId: 783}, function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));

        it('should call externalInterface PUT when updating a single externalInterface and respond back with data', inject(function(externalInterfaceSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('PUT',environmentSvc.baseUrl('dev') + '/accounts/783/interfaces/123').respond({data:'test'});
            externalInterfaceSvc.externalInterface.update({accountId: 783, externalInterfaceId: 123}, function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));

        it('should call externalInterface DELETE when deleting a single externalInterface and respond back with data', inject(function(externalInterfaceSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('DELETE',environmentSvc.baseUrl('dev') + '/accounts/783/interfaces/123').respond({data:'test'});
            externalInterfaceSvc.externalInterface.delete({accountId: 783, externalInterfaceId: 123}, function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));
    });
});
