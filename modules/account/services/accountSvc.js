'use strict';
(function() {
    angular.module('account.module').factory('accountSvc', function(restResourceSvc) {
        return {
            account: restResourceSvc.restResource('/accounts/:accountId',  {accountId: '@accountId'})
        };
    });
})();
