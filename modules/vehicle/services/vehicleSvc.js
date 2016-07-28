'use strict';
(function() {
    angular.module('vehicle.module').factory('vehicleSvc', function(restResourceSvc) {
        return {
            vehicleByCustomer: restResourceSvc.restResource('/accounts/:accountId/assets/:vehicleId',
                {accountId: '@accountId', vehicleId: '@avehicleId'})
        };
    });
})();
