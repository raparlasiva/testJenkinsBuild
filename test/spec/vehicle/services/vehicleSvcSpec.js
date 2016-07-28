'use strict';

describe('vehicleSvc service', function() {

  // load modules
  beforeEach(module('vehicle.module'));

  describe('vehicleSvc defined and able to fetch', function () {
    //Test service availability
    it('check the existence of vehicleSvc factory', inject(function(vehicleSvc) {
      assert.isDefined(vehicleSvc);
      assert.isDefined(vehicleSvc.vehicleByCustomer);
    }));

    it('should call vehicle get and respond back with data', inject(function (vehicleSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('POST', environmentSvc.baseUrl('dev') + '/accounts/123/assets').respond({data: 'test'});
      vehicleSvc.vehicleByCustomer.save({accountId: 123}, function (response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));

    it('should call vehicle with GET method and respond back with data', inject(function (vehicleSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/123/assets').respond({data:'test'});
      vehicleSvc.vehicleByCustomer.get({accountId: 123} , function (response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));
  });
});
