describe('service module', function() {
    var httpBackend, scope;
    beforeEach(module('tmwApp'));
    beforeEach(module('service.module'));

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

        describe('should transition and set the properties of the service state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('service/views/service.html', '');
                $templateCache.put('service/views/serviceAdd.html', '');
            }));

            it('should set the state name, url, and views properties', function() {
                state.go('tmw.layout.service');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.service');
                state.current.url.should.equal('/service?accountId?credentialId');
                state.current.ncyBreadcrumb.label.should.equal('{{"Service" | translate}} {{"List" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('service/views/service.html');
                state.current.views['main@tmw.layout'].controller.should.equal('serviceCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');
            });
        });
    });
});
