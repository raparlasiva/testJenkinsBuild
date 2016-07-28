'use strict';
(function() {
    angular.module('externalInterface.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
            .state('tmw.layout.externalInterface', {
                url: '/externalInterface?accountId',
                params: {accountData: {}},
                ncyBreadcrumb: {
                    parent: 'tmw.layout.account.label({accountId: $stateParams.accountId})',
                    label: '{{"External" | translate}} {{"Interface" | translate}} {{"List" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'externalInterface/views/externalInterface.html',
                        controller: 'externalInterfaceCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('tmw.layout.externalInterface.add', {
                url: '/add',
                ncyBreadcrumb: {
                    label: '{{"External" | translate}} {{"Interface" | translate}} {{"Add" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'externalInterface/views/externalInterfaceAddEdit.html',
                        controller: 'externalInterfaceAddEditCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('tmw.layout.externalInterface.edit', {
                url: '/edit?externalInterfaceId',
                ncyBreadcrumb: {
                    label: '{{"External" | translate}} {{"Interface" | translate}} {{"Edit" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'externalInterface/views/externalInterfaceAddEdit.html',
                        controller: 'externalInterfaceAddEditCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('tmw.layout.externalInterface.view', {
                url: '/view?externalInterfaceId',
                ncyBreadcrumb: {
                    label: '{{"External" | translate}} {{"Interface" | translate}} {{"View" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'externalInterface/views/externalInterfaceView.html',
                        controller: 'externalInterfaceViewCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
    });
})();
