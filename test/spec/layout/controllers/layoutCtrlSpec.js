'use strict';

describe('layout Ctrl', function () {
  var layoutInitializer, state, stateParams;
  var layoutController, alertingSvc, authTokenSvc, tokenName;
  var httpBackend;
  var envUrl;

  beforeEach(module('ui.router'));
  beforeEach(module('tmwServices'));
  beforeEach(module('layout.module'));

  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    httpBackend = $httpBackend;
    envUrl = environmentSvc.baseUrl('dev');

    stateParams = {};
    state = {
      go: sinon.stub()
    };

    alertingSvc = {
      removeAlert: sinon.stub()
    };
    tokenName = '';

    authTokenSvc = {
      removeToken: sinon.stub(),
      getToken : sinon.stub(),
    };

    layoutInitializer = {
      init: function () {
        layoutController =
          $controller('layoutCtrl', {
            alertingSvc:alertingSvc, authTokenSvc: authTokenSvc,
            $state: state, stateParams: stateParams
          });
      }
    };
  }));
  it('should set the loginUserName from the authToken service loginName', function() {
    authTokenSvc.getToken.returns('someUserName');
    layoutInitializer.init();
    layoutController.loginUserName.should.equal('someUserName');
  });

  it('should remove any alerts when logout is called ', function () {

    layoutInitializer.init();
    layoutController.logout();
    alertingSvc.removeAlert.should.have.been.called;
  });

  it('should call the removeToken method and remove the token when logout is called', function () {

    layoutInitializer.init();
    layoutController.logout();
    authTokenSvc.removeToken.should.have.been.calledWith('auth-token');
    authTokenSvc.removeToken.should.have.been.calledWith('loginName');
  });

  it('should navigate to login page when logout is called ', function () {
    layoutInitializer.init();
    layoutController.logout();
    state.go.should.have.been.calledWith('tmw.login');
  });
});
