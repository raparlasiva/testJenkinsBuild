'use strict';
(function() {
    angular.module('tmwDirectives').directive('alertMessage', function(alertingSvc) {
        return {
            restrict: 'AE', // only activate as element,attribute
            templateUrl: 'views/alertMessage.html',
            scope: {},
            controller: function($scope) {
                $scope.closeAlert = function(index) {
                    alertingSvc.removeAlertByIndex(index);
                }
            },
            link: function(scope) {//scope, element, attributes
                scope.alerts = alertingSvc.alerts;
            }
        }
    });
})();



