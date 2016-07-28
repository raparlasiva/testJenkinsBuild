'use strict';
(function() {
    angular.module('tmwDirectives').directive('addButton', function() {
        return {
            restrict: 'AE',
            template: '<button type="button" class="btn btn-default btn-primary" ng-click=\'click()\' >'+
                      '<i class="fa fa-plus"></i> {{ "Add" | translate}}</button>',
            scope:{
                click: '&'
            }
        }
    });
})();
