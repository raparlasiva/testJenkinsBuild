'use strict';
(function() {
    angular.module('login.module').controller('loginCtrl', function($state, loginSvc, authTokenSvc,
                                                                    alertingSvc, $log, $interval) {
        var self = this;
        self.serverAvailable = false;
        self.pingCtr = 0;

        self.login = function(loginFrm) {
            if (!loginFrm.$valid) {
                return;
            }
            alertingSvc.clearAlerts();
            loginSvc.login.save(self.loginInfo,
              function(response) {
                  authTokenSvc.setToken('auth-token',response.token);
                  authTokenSvc.setToken('loginName',response.user.username);
                  self.loginInfo = response.user;
                  $state.go('tmw.layout.account');
              });
        };

        var autoLogin = function() {
            var hasAutoLogin = false;
            var autoLoginUser = authTokenSvc.getToken('auto-login-user');
            var autoLoginPassword = authTokenSvc.getToken('auto-login-password');
            if(autoLoginUser && autoLoginPassword){
                hasAutoLogin = true;
                self.loginInfo = {
                    username: autoLoginUser,
                    password: autoLoginPassword
                };
                self.login({$valid:true});
            }
            return hasAutoLogin;
        };

        var pingServer = function() {
            if(self.serverAvailable) return;
            alertingSvc.clearAlerts();
            self.pingCtr++;
            loginSvc.loginInit
              .get(function(response) {
                  self.serverAvailable = true;
                  if (autoLogin()) return;
                  if (authTokenSvc.getToken('auth-token')) {
                      $log.debug('token found');
                      $log.debug('response from server ', response);
                      $state.go('tmw.layout.account');
                  }
              });
        };

        var init = function() {
            self.pingCtr =0;
            pingServer();
            $interval(pingServer,5000);
        };

        init();
    });
})();
