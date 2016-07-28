'use strict';
(function() {
    angular.module('layout.module').controller('layoutCtrl', function($state, $stateParams, authTokenSvc, alertingSvc) {
        var self = this;

        if(authTokenSvc.getToken('loginName')) {
            self.loginUserName = authTokenSvc.getToken('loginName');
        }

        self.logout = function() {
            alertingSvc.removeAlert();
            authTokenSvc.removeToken('auth-token');
            authTokenSvc.removeToken('loginName');
            if (authTokenSvc.getToken('auto-login-password')) {
                authTokenSvc.setToken('auto-login-password','');
            }
            $state.go('tmw.login');
        }
    });
})();
