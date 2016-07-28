'use strict';

describe('serviceSvc service', function() {

    // load modules
    beforeEach(module('service.module'));

    describe('serviceSvc defined and able to fetch', function () {
        //Test service availability
        it('check the existence of serviceSvc factory', inject(function(serviceSvc) {
            assert.isDefined(serviceSvc);
            assert.isDefined(serviceSvc.serviceFaults);
        }));

        it('should call service with GET method and respond back with data', inject(function(serviceSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/services').respond({data:'test'});
            serviceSvc.serviceFaults.get(function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));
    });
});
