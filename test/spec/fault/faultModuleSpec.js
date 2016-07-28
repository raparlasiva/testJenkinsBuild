describe('fault module', function() {
  var httpBackend, scope;
  beforeEach(module('tmwApp'));
  beforeEach(module('fault.module'));

  beforeEach(module('tmwServices', function($provide) {
    $provide.service('authTokenSvc', sinon.stub().returns({getToken: sinon.stub().returns('key')}));
  }));

  beforeEach(inject(function($templateCache, $rootScope, $state, $httpBackend) {
    $templateCache.put('views/main.html', '');$templateCache.put('login/views/login.html', '');
    scope = $rootScope.$new();
    state = $state;
    httpBackend = $httpBackend;
    httpBackend.expectGET('scripts/resources/en_US.json').respond({});
    httpBackend.flush();
  }));

  describe('state, url, templateUrl and Ctrl name testing -', function() {
    // state
    it('the default state should be tmw.login', function() {
      scope.$apply();
      state.current.name.should.equal('tmw.login');
    });

    describe('should transition and set the properties of the fault state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('fault/views/fault.html', '');
        $templateCache.put('fault/views/faultAdd.html', '');
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.fault');
        scope.$apply();

        state.current.name.should.equal('tmw.layout.fault');
        state.current.url.should.equal('/fault?vehicleId?accountId');
        state.current.ncyBreadcrumb.parent.should.equal('tmw.layout.vehicle.label({vehicleId: $stateParams.vehicleId, ' +
            'accountId: $stateParams.accountId})');
        state.current.ncyBreadcrumb.label.should.equal('{{"Fault" | translate}} {{"List" | translate}}');

        state.current.views['main@tmw.layout'].templateUrl.should.equal('fault/views/fault.html');
        state.current.views['main@tmw.layout'].controller.should.equal('faultCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
      });
    });

    describe('should transition and set the properties of the fault Add state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('fault/views/fault.html', '');
        $templateCache.put('fault/views/faultAdd.html', '');
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.fault.add');
        scope.$apply();

        state.current.name.should.equal('tmw.layout.fault.add');
        state.current.url.should.equal('/add');

        state.current.views['main@tmw.layout'].templateUrl.should.equal('fault/views/faultAdd.html');
        state.current.views['main@tmw.layout'].controller.should.equal('faultAddCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
      });
    });
  });
});
