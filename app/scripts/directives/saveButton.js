'use strict';
(function() {
    angular.module('tmwDirectives').directive('saveButton', function() {
        return {
            restrict: 'E',
            template: '<button ng-disabled="!form.$dirty" class="btn btn-primary" type="submit">' +
            '<i class="fa fa-floppy-o"></i> {{"Save" | translate}}</button>',
            scope:{},
            require:['^form'],
            link: function(scope,elements,attrs,ctrls) {
                scope.form = ctrls[0];
            }
        }
    });
})();
