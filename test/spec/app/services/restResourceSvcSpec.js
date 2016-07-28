'use strict';

describe('service:restResourceSvc', function() {
  var restResourceSvc, environmentSvc,resource;
  beforeEach(module('tmwGlobals'));

  beforeEach(inject(function(_environmentSvc_, $resource) {
    environmentSvc  = _environmentSvc_;
    resource = $resource;
    environmentSvc.baseUrl = sinon.stub();
  }));

  beforeEach(inject(function(_restResourceSvc_) {
    restResourceSvc = _restResourceSvc_;
  }));

  it('should call the environmentSvc baseUrl method', function () {
    environmentSvc.baseUrl.should.have.been.calledWith('dev');
  });

  it('should call the environmentSvc baseUrl method', function () {
    var resourceFn = restResourceSvc.restResource('/someEndpoint', '/params');
    assert.isDefined(resourceFn);
    assert.isFunction(resourceFn);
  });

});
