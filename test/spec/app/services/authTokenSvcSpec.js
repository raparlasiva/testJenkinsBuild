'use strict';

describe('service:authTokenSvc', function() {
  var  authTokenSvc, window;

  beforeEach(module('tmwServices'));

  beforeEach(inject(function(_authTokenSvc_, $window) {
    window = $window;
    authTokenSvc = _authTokenSvc_;
  }));

  it('should define getToken, setToken Methods', function() {
    assert.isDefined(authTokenSvc);
    assert.isDefined(authTokenSvc.getToken);
    assert.isDefined(authTokenSvc.setToken);
    assert.isDefined(authTokenSvc.removeToken);
  });

  it('should set the token in localstorage when token is provided', function() {
    authTokenSvc.setToken('auth', '1234');
    window.localStorage.getItem('auth').should.equal('1234');
  });

  it('should get the Token from localStorage if a token is set', function() {
    authTokenSvc.getToken('auth').should.equal('1234');
  });

  it('should remove the token in local storage when no token is provided', function() {
    authTokenSvc.removeToken('auth');
    should.equal(window.localStorage.getItem('auth'),null);
  });
});


