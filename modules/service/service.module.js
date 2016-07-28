'use strict';
(function() {
    angular.module('service.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
            .state('tmw.layout.service', {
                url: '/service?accountId?credentialId',
                params: {accountPageId: 1, credentialData: {}},
                ncyBreadcrumb: {
                    parent: 'tmw.layout.credential({accountId: $stateParams.accountId})',
                    label: '{{"Service" | translate}} {{"List" | translate}}'
                },
                views: {
                    'main@tmw.layout': {
                        templateUrl: 'service/views/service.html',
                        controller: 'serviceCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            })
    });
})();
