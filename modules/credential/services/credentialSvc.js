'use strict';
(function() {
    angular.module('credential.module').factory('credentialSvc', function(restResourceSvc) {
        return {
            credential: restResourceSvc.restResource('/accounts/:accountId/credentials/:credentialId',
                {accountId: '@accountId', credentialId: '@credentialId'},
                {update:{method:'PUT'}}
            )
        };
    });
})();
