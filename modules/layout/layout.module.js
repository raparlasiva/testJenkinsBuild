'use strict';
(function() {
    angular.module('layout.module', []).config(function($stateProvider) {
        $stateProvider
          .state('tmw.layout', {
              url: '/layout',
              abstract: true,
              views: {
                  'main@tmw': {
                      templateUrl: 'layout/views/layout.html',
                      controller: 'layoutCtrl',
                      controllerAs: 'ctrl'
                  },
                  'navbarView@tmw.layout': {
                      templateUrl: 'layout/views/navbar.html'
                  },
                  'containerView@tmw.layout': {
                      templateUrl: 'layout/views/container.html'
                  }
              }
          });
    });
})();
