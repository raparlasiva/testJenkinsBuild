describe('vehicle module', function() {
  var httpBackend, scope;
  beforeEach(module('tmwApp'));
  beforeEach(module('vehicle.module'));

  beforeEach(module('tmwServices', function($provide) {
    $provide.service('authTokenSvc', function () {
      return {getToken: sinon.stub().returns(true)}
    });
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
    it('the devehicle state should be tmw.login', function() {
      scope.$apply();
      state.current.name.should.equal('tmw.login');
    });

    describe('should transition and set the properties of the vehicle state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('vehicle/views/vehicle.html', '');
        $templateCache.put('vehicle/views/vehicleAdd.html', '');
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.vehicle');
        scope.$apply();

        state.current.name.should.equal('tmw.layout.vehicle');
        state.current.url.should.equal('/vehicle?accountId');
        state.current.ncyBreadcrumb.parent.should.equal('tmw.layout.account.label({accountId: $stateParams.accountId})');
        state.current.ncyBreadcrumb.label.should.equal('{{"Vehicle " | translate }} {{"List" | translate}}');

        state.current.views['main@tmw.layout'].templateUrl.should.equal('vehicle/views/vehicle.html');
        state.current.views['main@tmw.layout'].controller.should.equal('vehicleCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
      });
    });

    describe('should transition and set the properties of the vehicle Add state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('vehicle/views/vehicle.html', '');
        $templateCache.put('vehicle/views/vehicleAdd.html', '');
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.vehicle.add');
        scope.$apply();

        state.current.name.should.equal('tmw.layout.vehicle.add');
        state.current.url.should.equal('/add');
        state.current.ncyBreadcrumb.label.should.equal('{{"Vehicle" | translate}} {{"Add" | translate}}');
        state.current.views['main@tmw.layout'].templateUrl.should.equal('vehicle/views/vehicleAdd.html');
        state.current.views['main@tmw.layout'].controller.should.equal('vehicleAddCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
      });
    });

    describe('should transition and set the properties of the vehicle Detail state -', function() {
      beforeEach(inject(function($templateCache) {
        $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
        $templateCache.put('layout/views/container.html', '');$templateCache.put('vehicle/views/vehicle.html', '');
        $templateCache.put('vehicle/views/vehicleAdd.html', ''); $templateCache.put('vehicle/views/vehicleDetail.html', '')
      }));

      it('should set the state name, url, and views properties', function() {
        state.go('tmw.layout.vehicle.detail');
        scope.$apply();

        state.current.name.should.equal('tmw.layout.vehicle.detail');
        state.current.url.should.equal('/detail?vehicleId');
        state.current.ncyBreadcrumb.label.should.equal('{{"Vehicle" | translate}} {{"Detail" | translate}} ');

        state.current.views['main@tmw.layout'].templateUrl.should.equal('vehicle/views/vehicleDetail.html');
        state.current.views['main@tmw.layout'].controller.should.equal('vehicleDetailCtrl');
        state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

      });
    });
  });
});
