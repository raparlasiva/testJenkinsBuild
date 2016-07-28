'use strict';
(function() {
    angular.module('tmwDirectives').directive('backButton', function() {
        return {
            restrict: 'AE',
            template: '<a class="btn btn-default"><i class="fa fa-chevron-left"></i> {{"Back" | translate}}</a>'
        }
    });
})();
