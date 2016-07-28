'use strict';
(function() {
    angular.module('tmwServices').factory('restResourceSvc', function(environmentSvc, $resource) {
        var baseUrl = environmentSvc.baseUrl('dev');
        return {
            restResource: function(endPoint, parms, otherMethods) {
                var resolvedUrl = baseUrl + endPoint;
                return $resource(resolvedUrl, parms, otherMethods);
            }
        };
    });
})();

