describe('account module', function() {
  var httpBackend;
  beforeEach(module('tmwApp'));
  beforeEach(module('account.module'));

  beforeEach(module('tmwServices', function($provide) {
    $provide.service('authTokenSvc', function () {
      return {getToken: sinon.stub().returns(true)}
    });

  }));

  beforeEach(inject(function($templateCache, $rootScope, $state, $httpBackend) {
    httpBackend = $httpBackend
    $templateCache.put('views/main.html', '');$templateCache.put('login/views/login.html', '');
    scope = $rootScope.$new();
    state = $state;
    httpBackend.expectGET('scripts/resources/en_US.json').respond({});
    httpBackend.flush();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('state, url, templateUrl and Ctrl name testing -', function() {
    // state
    it('the account state should be tmw.login', function() {
      scope.$apply();

      state.current.name.should.equal('tmw.login');
    });

    describe('should transition and set the properties of the account state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('account/views/account.html', '');
        $templateCache.put('account/views/accountAdd.html', '');
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.account');
        scope.$apply();
        state.current.data.pageId.should.equal(1);
        state.current.name.should.equal('tmw.layout.account');
        state.current.url.should.equal('/account');
        state.current.reloadOnSearch.should.equal(false);

        state.current.ncyBreadcrumb.label.should.equal('{{"Account List" | translate}}');

        state.current.views['main@tmw.layout'].templateUrl.should.equal('account/views/account.html');
        state.current.views['main@tmw.layout'].controller.should.equal('accountCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
      });
    });
    describe('should transition and set the properties of the account Add state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('account/views/account.html', '');
        $templateCache.put('account/views/accountAdd.html', '');
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.account.add');
        scope.$apply();

        state.current.name.should.equal('tmw.layout.account.add');
        state.current.url.should.equal('/add');

        state.current.views['main@tmw.layout'].templateUrl.should.equal('account/views/accountAdd.html');
        state.current.views['main@tmw.layout'].controller.should.equal('accountAddCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
      });
    });
  });
});
