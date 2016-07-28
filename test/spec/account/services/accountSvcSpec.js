'use strict';

describe('accountSvc service', function() {

  // load modules
  beforeEach(module('account.module'));

  describe('accountSvc defined and able to fetch', function () {
    //Test service availability
    it('check the existence of accountSvc factory', inject(function(accountSvc) {
      assert.isDefined(accountSvc.account);
    }));

    it('should call account POST and respond back with data', inject(function (accountSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('POST', environmentSvc.baseUrl('dev') + '/accounts').respond({data: 'test'});
      accountSvc.account.save(function(response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));

    it('should call all account with GET method and respond back with data', inject(function (accountSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts').respond({data:'test'});
      accountSvc.account.get(function(response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));

    it('should call a single account with GET method and respond back with data', inject(function (accountSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/783').respond({data:'test'});
      accountSvc.account.get({accountId: 783}, function(response) {
        response.data.should.equal('test');
      });
      $httpBackend.flush();
    }));
  });
});
