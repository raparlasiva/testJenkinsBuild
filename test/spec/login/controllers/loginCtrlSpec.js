'use strict';

describe('login Ctrl', function () {
  var state, alertingSvc, authTokenSvc;
  var httpBackend;
  var envUrl;
  var ctrlConstructor;

  beforeEach(module('login.module'));

  var loginData = function() {
    return {user: {id: 'tom', password: 'p'}, token: 'sdsdd'};
  };

  beforeEach(inject(function ($controller, $httpBackend, environmentSvc) {
    httpBackend = $httpBackend;
    envUrl = environmentSvc.baseUrl('dev');

    state = {
      go: sinon.stub()
    };

    alertingSvc = {
      clearAlerts: sinon.stub()
    };

    authTokenSvc = {
      getToken : sinon.stub(),
      removeToken: sinon.stub(),
      setToken: sinon.stub()
    };

    ctrlConstructor = function () {
      return $controller('loginCtrl', {alertingSvc:alertingSvc, authTokenSvc: authTokenSvc, $state: state});
      }
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('loginInitialization - whether the user is already logged in', function () {
    it('when no Auth-token is found, the loginInfo object should be null ', function () {
      httpBackend.expectGET(envUrl + '/login').respond({});
      authTokenSvc.getToken.returns(false);
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      should.not.exist(ctrl.loginInfo);
    });

    it('should go to account state if the auth-token and login id fetched from xhr', function() {
      httpBackend.expectGET(envUrl + '/login').respond({loggedIn: true});
      authTokenSvc.getToken.onCall(0).returns(false);
      authTokenSvc.getToken.onCall(1).returns(false);
      authTokenSvc.getToken.onCall(2).returns(true);
      ctrlConstructor();
      httpBackend.flush();
      state.go.should.have.been.calledWith('tmw.layout.account');
    });

    it('should login if the auto-login parms return valid values ', function() {
      httpBackend.expectGET(envUrl + '/login').respond({});
      httpBackend.expectPOST(envUrl + '/login').respond(loginData());
      authTokenSvc.getToken.onCall(0).returns(true);
      authTokenSvc.getToken.onCall(1).returns(true);
      authTokenSvc.getToken.onCall(2).returns(true);
      ctrlConstructor();
      httpBackend.flush();
    });
  });

  describe('login - calling the login function', function () {
    it('should call clearAlerts method of alertingSvc', function () {
      httpBackend.expectGET(envUrl + '/login').respond({});
      httpBackend.expectPOST(envUrl + '/login').respond(loginData());
      var ctrl = ctrlConstructor();
      ctrl.loginInfo = {'id': 'tom', username:'tome', 'password': 'p'};
      ctrl.login({$valid:true});
      httpBackend.flush();
      alertingSvc.clearAlerts.should.have.been.called;
      authTokenSvc.setToken.should.have.been.calledWith('auth-token', loginData().token);
      authTokenSvc.setToken.should.have.been.calledWith('loginName', loginData().user.username);
      ctrl.loginInfo.should.deep.equal(loginData().user);
      state.go.should.have.been.calledWith('tmw.layout.account');
    });

    it('should return from the controller when the form is not valid', function () {
      httpBackend.expectGET(envUrl + '/login').respond({});
      var ctrl = ctrlConstructor();
      httpBackend.flush();
      ctrl.login({$valid:false});
      authTokenSvc.setToken.should.not.have.been.called;
      state.go.should.not.have.been.called;
    });

  });
});
