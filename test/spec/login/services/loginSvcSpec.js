'use strict';

describe('login service', function() {

  // load modules
  beforeEach(module('ui.router'));
  beforeEach(module('tmwServices'));
  beforeEach(module('login.module'));

  describe('login defined and able to fetch', function () {
    //Test service availability
    it('check the existence of loginSvc factory', inject(function(loginSvc) {
      assert.isDefined(loginSvc);
      assert.isDefined(loginSvc.login);
      assert.isDefined(loginSvc.loginInit);
    }));

    it('should call login get and respond back with username', inject(function (loginSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('POST', environmentSvc.baseUrl('dev') + '/login').respond({user: {username: 'test'}, token: '123'});
      loginSvc.login.save(function (response) {
        response.user.should.deep.equal({username: 'test'});
        response.token.should.equal('123');
      });
      $httpBackend.flush();
    }));

    it('should call loginInit with GET method and respond back with username and token', inject(function (loginSvc, $httpBackend, environmentSvc) {
      $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/login').respond({user:'test'});
      loginSvc.loginInit.get(function (response) {
        response.user.should.equal('test');
      });
      $httpBackend.flush();
    }));
  });
});