'use strict';
(function() {
    angular.module('credential.module').controller('credentialViewCtrl',
        function($state, $stateParams, credentialSvc) {
            var self = this;

            self.getData = function() {
                credentialSvc.credential.get({accountId: $stateParams.accountId,
                    credentialId: $stateParams.credentialId},function(response) {
                    self.data = response.data[0];
                });
            };
            self.getData();
        });
})();
