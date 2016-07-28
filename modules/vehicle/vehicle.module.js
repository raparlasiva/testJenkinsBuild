'use strict';
(function() {
    angular.module('vehicle.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
          .state('tmw.layout.vehicle', {
              url: '/vehicle?accountId',
              ncyBreadcrumb: {
                  parent: 'tmw.layout.account.label({accountId: $stateParams.accountId})',
                  label: '{{"Vehicle " | translate }} {{"List" | translate}}'
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'vehicle/views/vehicle.html',
                      controller: 'vehicleCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          })
          .state('tmw.layout.vehicle.detail', {
              url: '/detail?vehicleId',
              ncyBreadcrumb: {
                  label: '{{"Vehicle" | translate}} {{"Detail" | translate}} '
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'vehicle/views/vehicleDetail.html',
                      controller: 'vehicleDetailCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          })
          .state('tmw.layout.vehicle.label', {
              url: '',
              ncyBreadcrumb: {
                  label: '{{"Vehicle" | translate}} {{$stateParams.vehicleId}}'
              }
          })
          .state('tmw.layout.vehicle.add', {
              url: '/add',
              params: {accountData: {}},
              ncyBreadcrumb: {
                  label: '{{"Vehicle" | translate}} {{"Add" | translate}}'
              },
              views: {
                  'main@tmw.layout': {
                      templateUrl: 'vehicle/views/vehicleAdd.html',
                      controller: 'vehicleAddCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          });
    });
})();
