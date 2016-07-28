'use strict';
(function() {
    angular.module('account.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
          .state('tmw.layout.account', {
              data: {
                  pageId: 1
              },
              url: '/account',
              reloadOnSearch : false,
              ncyBreadcrumb: {
                  label: '{{"Account List" | translate}}'
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'account/views/account.html',
                      controller: 'accountCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          })
          .state('tmw.layout.account.label', {
              url: '',
              ncyBreadcrumb: {
                  label: '{{"Account" | translate}} {{$stateParams.accountId}}'
              }
          })
          .state('tmw.layout.account.add', {
              url: '/add',
              ncyBreadcrumb: {
                  label: '{{"Account" | translate}} {{"Add" | translate}}'
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'account/views/accountAdd.html',
                      controller: 'accountAddCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          });
    });
})();
