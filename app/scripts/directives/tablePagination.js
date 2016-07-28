'use strict';
(function() {
    angular.module('tmwDirectives').directive('tablePagination', function() {
        return {
            restrict: 'E',
            template: '<div ng-hide="totalHits < 10">' +
            '<uib-pagination total-items="totalHits"max-size="10" boundary-links="true" rotate="false"' +
            'ng-model="currentClickedPage" ng-change="paginationChanged({newPage:currentClickedPage})"> ' +
            '</uib-pagination></div>',
            scope: {
                totalHits: '=',
                currentClickedPage: '=',
                paginationChanged: '&'
            }
        }
    });
})();

