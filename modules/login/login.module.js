'use strict';
(function() {
    angular.module('login.module', ['dependencies', 'tmwGlobals']).config(function($stateProvider) {
        $stateProvider
          .state('tmw.login', {
              url: '/login',
              views: {
                  'main@tmw': {
                      templateUrl: 'login/views/login.html',
                      controller: 'loginCtrl',
                      controllerAs: 'ctrl'
                  }
              }
          });
    });
})();
