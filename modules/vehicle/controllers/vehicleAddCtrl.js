'use strict';
(function() {
    angular.module('vehicle.module').controller('vehicleAddCtrl',
        function($state, $stateParams, vehicleSvc, accountSvc) {
            var self = this;
            self.frmData = {
                id: $stateParams.accountId,
                account: {},
                faults: []
            };

            if(_.isEmpty($stateParams.accountData)){
                accountSvc.account.get({accountId: $stateParams.accountId},function(response) {
                    self.frmData.account = response.data.length > 0 ? response.data[0]: {};
                });
            } else  {
                self.frmData.account = $stateParams.accountData;
            }

            self.saveData = function(vehicleAddFrm) {
                if(vehicleAddFrm.$invalid || !vehicleAddFrm.$dirty) return false;

                vehicleSvc.vehicleByCustomer.save({accountId: $stateParams.accountId}, self.frmData, function() {
                    $state.go('tmw.layout.vehicle');
                });
            };
        });
})();
