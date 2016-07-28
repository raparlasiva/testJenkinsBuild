describe('credential module', function() {
    var httpBackend, scope;
    beforeEach(module('tmwApp'));
    beforeEach(module('credential.module'));

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

        describe('should transition and set the properties of the credential state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('credential/views/credential.html', '');
                $templateCache.put('credential/views/credentialAddEdit.html', '');
            }));

            it('should set the state name, url, and views properties', function() {
                state.go('tmw.layout.credential');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.credential');
                state.current.url.should.equal('/credential?accountId');
                state.current.params.should.deep.equal({accountData: {}});
                state.current.ncyBreadcrumb.parent.should.equal('tmw.layout.account.label({accountId: $stateParams.accountId})');
                state.current.ncyBreadcrumb.label.should.equal('{{"Credential" | translate}} {{"List" | translate}}');


                state.current.views['main@tmw.layout'].templateUrl.should.equal('credential/views/credential.html');
                state.current.views['main@tmw.layout'].controller.should.equal('credentialCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });
        describe('should transition and set the properties of the credential ADD state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('credential/views/credential.html', '');
                $templateCache.put('credential/views/credentialAddEdit.html', '');
            }));

            it('should set the state name, url, and views properties of the credential add state', function() {
                state.go('tmw.layout.credential.add');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.credential.add');
                state.current.url.should.equal('/add');
                state.current.ncyBreadcrumb.label.should.equal('{{"Credential" | translate}} {{"Add" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('credential/views/credentialAddEdit.html');
                state.current.views['main@tmw.layout'].controller.should.equal('credentialAddEditCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });
        describe('should transition and set the properties of the credential EDIT state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('credential/views/credential.html', '');
                $templateCache.put('credential/views/credentialAddEdit.html', '');
            }));

            it('should set the state name, url, and views properties of the credential EDIT state', function() {
                state.go('tmw.layout.credential.edit');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.credential.edit');
                state.current.url.should.equal('/edit?credentialId');
                state.current.ncyBreadcrumb.label.should.equal('{{"Credential" | translate}} {{"Edit" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('credential/views/credentialAddEdit.html');
                state.current.views['main@tmw.layout'].controller.should.equal('credentialAddEditCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });
        describe('should transition and set the properties of the credential ReadOnly state -', function() {
            beforeEach(inject(function($templateCache) {
                $templateCache.put('layout/views/layout.html', '');$templateCache.put('layout/views/navbar.html', '');
                $templateCache.put('layout/views/container.html', '');$templateCache.put('credential/views/credential.html', '');
                $templateCache.put('credential/views/credentialAddEdit.html', '');$templateCache.put('credential/views/credentialView.html', '')
            }));

            it('should set the state name, url, and views properties of the credential EDIT state', function() {
                state.go('tmw.layout.credential.view');
                scope.$apply();

                state.current.name.should.equal('tmw.layout.credential.view');
                state.current.url.should.equal('/view?credentialId');
                state.current.ncyBreadcrumb.label.should.equal('{{"Credential" | translate}} {{"View" | translate}}');

                state.current.views['main@tmw.layout'].templateUrl.should.equal('credential/views/credentialView.html');
                state.current.views['main@tmw.layout'].controller.should.equal('credentialViewCtrl');
                state.current.views['main@tmw.layout'].controllerAs.should.equal('ctrl');

            });
        });
    });
});
