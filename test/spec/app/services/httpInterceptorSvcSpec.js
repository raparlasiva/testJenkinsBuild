'use strict';

describe('service:httpInterceptorSvc', function() {
  var  httpInterceptorSvc, q, alertingSvc, authTokenSvc, location;

  beforeEach(module('tmwServices'));

  beforeEach(inject(function(_httpInterceptorSvc_, $q, _alertingSvc_, _authTokenSvc_, $location) {
    httpInterceptorSvc = _httpInterceptorSvc_;
    alertingSvc = _alertingSvc_;
    authTokenSvc = _authTokenSvc_;
    q = $q;
    location = $location;

    q.reject = sinon.stub();
    location.path = sinon.stub().returns('/login');

    alertingSvc.addDanger = sinon.stub();
    authTokenSvc.getToken = sinon.stub().returns('tokenName');
  }));

  it('should define request method', function() {
    assert.isDefined(httpInterceptorSvc.request);
  });

  it('should set the Authorization Header on every request ', function() {
    var authRequestHeader = 'Bearer tokenName';
    httpInterceptorSvc.request({}).should.deep.equal({headers:{Authorization: authRequestHeader}});
  });

  it('should add the danger alert if the server is down', function () {
    var response = {status: -1};
    httpInterceptorSvc.responseError(response);
    location.path.should.have.been.calledWith('/login');
    q.reject.should.have.been.calledWith(response);
  });

  it('should add the danger alert on 401', function () {
    var response = {status: 401, data: 'someData401'};
    httpInterceptorSvc.responseError(response);

    location.path.should.have.been.calledWith('/login');
    q.reject.should.have.been.calledWith(response);
  });

  it('should add the danger alert on 403', function () {
    var response = {status: 403, data: 'someData403'};
    httpInterceptorSvc.responseError(response);

    alertingSvc.addDanger.should.have.been.calledWith('You do not have rights to the requested resource:someData403');
    q.reject.should.have.been.calledWith(response);
  });

  it('should add the danger alert on 404', function () {
    var response = {status: 404, data: {message: 'someData'}};
    httpInterceptorSvc.responseError(response);

    alertingSvc.addDanger.should.have.been.calledWith('End point missing..  someData');
    q.reject.should.have.been.calledWith(response);
  });
  it('should set the Authorization Header on every request ', function() {
    var authRequestHeader = 'Bearer tokenName';
    httpInterceptorSvc.request({}).should.deep.equal({headers:{Authorization: authRequestHeader}});
  });
});



