describe('externalInterface module', function() {
    var httpBackend, scope;
    beforeEach(module('tmwApp'));
    beforeEach(module('externalInterface.module'));

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
        it('the default state should be tmw.login', function() {
            scope.$apply();
            state.current.name.should.equal('tmw.login');
        });

        describe('should transition and set the properties of the externalInterface state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('externalInterface/views/externalInterface.html', '');
                $templateCache.put('externalInterface/views/externalInterfaceAddEdit.html', '');
            }));

            it('should set the state name, url, and views properties', function() {
                state.go('tmw.layout.externalInterface');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.externalInterface');
                state.current.url.should.equal('/externalInterface?accountId');
                state.current.params.should.deep.equal({accountData: {}});
                state.current.ncyBreadcrumb.parent.should.equal('tmw.layout.account.label({accountId: $stateParams.accountId})');
                state.current.ncyBreadcrumb.label.should.equal('{{"External" | translate}} {{"Interface" | translate}} {{"List" | translate}}');


                state.current.views['main@tmw.layout'].templateUrl.should.equal('externalInterface/views/externalInterface.html');
                state.current.views['main@tmw.layout'].controller.should.equal('externalInterfaceCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });

        describe('should transition and set the properties of the externalInterface ADD state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('externalInterface/views/externalInterface.html', '');
                $templateCache.put('externalInterface/views/externalInterfaceAddEdit.html', '');
            }));

            it('should set the state name, url, and views properties of the externalInterface add state', function() {
                state.go('tmw.layout.externalInterface.add');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.externalInterface.add');
                state.current.url.should.equal('/add');
                state.current.ncyBreadcrumb.label.should.equal('{{"External" | translate}} {{"Interface" | translate}} {{"Add" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('externalInterface/views/externalInterfaceAddEdit.html');
                state.current.views['main@tmw.layout'].controller.should.equal('externalInterfaceAddEditCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });
        describe('should transition and set the properties of the externalInterface EDIT state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('externalInterface/views/externalInterface.html', '');
                $templateCache.put('externalInterface/views/externalInterfaceAddEdit.html', '');
            }));

            it('should set the state name, url, and views properties of the externalInterface EDIT state', function() {
                state.go('tmw.layout.externalInterface.edit');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.externalInterface.edit');
                state.current.url.should.equal('/edit?externalInterfaceId');
                state.current.ncyBreadcrumb.label.should.equal('{{"External" | translate}} {{"Interface" | translate}} {{"Edit" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('externalInterface/views/externalInterfaceAddEdit.html');
                state.current.views['main@tmw.layout'].controller.should.equal('externalInterfaceAddEditCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });

        describe('should transition and set the properties of the External Interface ReadOnly state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('externalInterface/views/externalInterface.html', '');
                $templateCache.put('externalInterface/views/externalInterfaceAddEdit.html', '');$templateCache.put('externalInterface/views/externalInterfaceView.html', '')

            }));

            it('should set the state name, url, and views properties of the external Interface View state', function() {
                state.go('tmw.layout.externalInterface.view');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.externalInterface.view');
                state.current.url.should.equal('/view?externalInterfaceId');
                state.current.ncyBreadcrumb.label.should.equal('{{"External" | translate}} {{"Interface" | translate}} {{"View" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('externalInterface/views/externalInterfaceView.html');
                state.current.views['main@tmw.layout'].controller.should.equal('externalInterfaceViewCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });
    });
});
