'use strict';

describe('faultSvc service', function() {

  // load modules
  beforeEach(module('fault.module'));

  describe('faultSvc defined and able to fetch', function () {
    //Test service availability
    it('check the existence of faultSvc factory', inject(function(faultSvc) {
      assert.isDefined(faultSvc);
      assert.isDefined(faultSvc.fault);
    }));

    it('should call fault POST and respond back with data', inject(function (faultSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('POST', environmentSvc.baseUrl('dev') + '/accounts/321/assets/123/faults').respond({data: 'test'});
      faultSvc.fault.save({accountId: 321, vehicleId: 123}, function (response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));

    it('should call fault with vehicleId (GET method) and respond back with data', inject(function (faultSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/321/assets/123/faults').respond({data:'test'});
      faultSvc.fault.get({accountId: 321, vehicleId: 123}, function(response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));
  });
});