describe('layout module', function() {
  var layoutState, httpBackend;
  beforeEach(module('tmwApp'));
  beforeEach(module('layout.module'));

  beforeEach(inject(function($templateCache, $state, $httpBackend) {
    layoutState = $state.get('tmw.layout');
    $templateCache.put('views/main.html', '');
    $templateCache.put('login/views/login.html', '');
    httpBackend = $httpBackend;
    httpBackend.expectGET('scripts/resources/en_US.json').respond({});
    httpBackend.flush();
  }));

  describe('state, route, templateUrl and Ctrl name testing -', function() {
    it('the state name should contain tmw.layout', inject(function($rootScope) {
      $rootScope.$apply();
      layoutState.name.should.include('tmw.layout');
    }));

    it('state url /layout', inject(function($rootScope) {
      $rootScope.$apply();
      layoutState.url.should.equal('/layout');
    }));

    it('state should be a abstract true ', inject(function($rootScope) {
      $rootScope.$apply();
      layoutState.abstract.should.equal(true);
    }));

    it('state views templateUrl should be layout/views/layout.html', inject(function($rootScope) {
      $rootScope.$apply();
      layoutState.views['main@tmw'].templateUrl.should.equal('layout/views/layout.html');
    }));
    it('state views controller should be loginCtrl', inject(function($rootScope) {
      $rootScope.$apply();
      layoutState.views['main@tmw'].controller.should.equal('layoutCtrl');
    }));
    it('state views controllerAs should be ctrl', inject(function($rootScope) {
      $rootScope.$apply();
      layoutState.views['main@tmw'].controllerAs.should.equal('ctrl');
    }));
  });
});

