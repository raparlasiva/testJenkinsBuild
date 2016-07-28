'use strict';

describe('service:environmentSvc', function() {
  var environmentSvc;

  beforeEach(module('tmwServices'));

  beforeEach(inject(function(_environmentSvc_) {
    environmentSvc = _environmentSvc_;
  }));

  it('should return the development baseUrl', function () {
    var envUrl = environmentSvc.baseUrl('dev');
    envUrl.should.equal('http://localhost:8001/api/v1');
  });

  it('should return the qa baseUrl', function () {
    var envUrl = environmentSvc.baseUrl('qa');
    envUrl.should.equal('http://localhost:8002');
  });

  it('should return the staging baseUrl', function () {
    var envUrl = environmentSvc.baseUrl('staging');
    envUrl.should.equal('http://localhost:8003');
  });

});
