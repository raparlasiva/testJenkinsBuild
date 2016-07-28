'use strict';
(function() {
    angular.module('externalInterface.module').controller('externalInterfaceViewCtrl',
        function($state, $stateParams, externalInterfaceSvc) {
            var self = this;

            self.getData = function() {
                externalInterfaceSvc.externalInterface.get({
                    accountId: $stateParams.accountId,
                    externalInterfaceId: $stateParams.externalInterfaceId
                },function(response) {
                    self.data = response.data.length > 0 ? response.data[0]: {};
                });
            };
            self.getData();
        });
})();
