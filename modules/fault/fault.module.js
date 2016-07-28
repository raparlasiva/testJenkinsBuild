'use strict';
(function() {
    angular.module('fault.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
          .state('tmw.layout.fault', {
              url: '/fault?vehicleId?accountId',
              ncyBreadcrumb: {
                  parent: 'tmw.layout.vehicle.label({vehicleId: $stateParams.vehicleId, ' +
                  'accountId: $stateParams.accountId})',
                  label: '{{"Fault" | translate}} {{"List" | translate}}'
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'fault/views/fault.html',
                      controller: 'faultCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          })
          .state('tmw.layout.fault.add', {
              url: '/add',
              ncyBreadcrumb: {
                  label: 'Fault Add'
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'fault/views/faultAdd.html',
                      controller: 'faultAddCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          });
    });
})();
