'use strict';
(function() {
    angular.module('externalInterface.module').factory('externalInterfaceSvc', function(restResourceSvc) {
        return {
            externalInterface: restResourceSvc.restResource('/accounts/:accountId/interfaces/:externalInterfaceId',
                {accountId: '@accountId', externalInterfaceId: '@externalInterfaceId'},
                {update:{method:'PUT'}}
            )
        };
    });
})();
