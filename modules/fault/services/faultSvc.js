'use strict';
(function() {
    angular.module('fault.module').factory('faultSvc', function(restResourceSvc) {
        return {
            fault: restResourceSvc.restResource('/accounts/:accountId/assets/:vehicleId/faults/',
                {accountId: '@accountId', vehicleId: '@vehicleId'})
        };
    });
})();
