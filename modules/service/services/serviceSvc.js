'use strict';
(function() {
    angular.module('service.module').factory('serviceSvc', function(restResourceSvc) {
        return {
            serviceFaults: restResourceSvc.restResource('/services/')
        };
    });
})();
