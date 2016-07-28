'use strict';
(function() {
    angular.module('account.module').controller('accountAddCtrl',
        function($state, $stateParams, authTokenSvc, accountSvc) {
            var self = this;

            self.saveData = function(accountAddFrm) {
                if(accountAddFrm.$invalid || !accountAddFrm.$dirty) return false;
                accountSvc.account.save(self.account, function() {
                    $state.go('tmw.layout.account');
                });
            };
        });
})();
