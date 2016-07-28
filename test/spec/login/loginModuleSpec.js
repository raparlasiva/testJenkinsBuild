describe('login module', function() {
  var httpBackend;
  beforeEach(module('tmwApp'));
  beforeEach(module('login.module'));

  beforeEach(inject(function($templateCache, $httpBackend) {
    $templateCache.put('views/main.html', '');
    $templateCache.put('login/views/login.html', '');
    httpBackend = $httpBackend;
    httpBackend.expectGET('scripts/resources/en_US.json').respond({});
    httpBackend.flush();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('state, route, templateUrl and Ctrl name testing -', function() {
    // state
    it('the state should be tmw.login', inject(function($rootScope, $state) {
      $rootScope.$apply();
      //$state.current.name.should.equal("tmw.login") ---> Mocha way
      $state.current.name.should.equal('tmw.login');
    }));

    it('state url /login', inject(function($rootScope, $state) {
      $rootScope.$apply();
      $state.current.url.should.equal('/login');
    }));

    it('state views templateUrl should be login/views/login.html', inject(function($rootScope, $state) {
      $rootScope.$apply();
      $state.current.views['main@tmw'].templateUrl.should.equal('login/views/login.html');
    }));
    it('state views controller should be loginCtrl', inject(function($rootScope, $state) {
      $rootScope.$apply();
      $state.current.views['main@tmw'].controller.should.equal('loginCtrl');
    }));
    it('state views controllerAs should be ctrl', inject(function($rootScope, $state) {
      $rootScope.$apply();
      $state.current.views['main@tmw'].controllerAs.should.equal('ctrl');
    }));
  });
});

