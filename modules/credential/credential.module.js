'use strict';
(function() {
    angular.module('credential.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
            .state('tmw.layout.credential', {
                url: '/credential?accountId',
                params: {accountData: {}},
                ncyBreadcrumb: {
                    parent: 'tmw.layout.account.label({accountId: $stateParams.accountId})',
                    label: '{{"Credential" | translate}} {{"List" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'credential/views/credential.html',
                        controller: 'credentialCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('tmw.layout.credential.add', {
                url: '/add',
                ncyBreadcrumb: {
                    label: '{{"Credential" | translate}} {{"Add" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'credential/views/credentialAddEdit.html',
                        controller: 'credentialAddEditCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('tmw.layout.credential.edit', {
                url: '/edit?credentialId',
                ncyBreadcrumb: {
                    label: '{{"Credential" | translate}} {{"Edit" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'credential/views/credentialAddEdit.html',
                        controller: 'credentialAddEditCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('tmw.layout.credential.view', {
                url: '/view?credentialId',
                ncyBreadcrumb: {
                    label: '{{"Credential" | translate}} {{"View" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'credential/views/credentialView.html',
                        controller: 'credentialViewCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
    });
})();
