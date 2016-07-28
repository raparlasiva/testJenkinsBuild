'use strict';
(function() {
    angular.module('tmwDirectives').directive('sortTable', function() {
        return {
            restrict: 'A',
            transclude: true,
            templateUrl:'views/sortTable.html',
            scope: {
                order: '@',
                svcCall: '&'
            },
            link: function(scope, element) {
                var tableParams = {};
                element[0].style.cursor = 'pointer';
                element.on('click', function() {
                    element.parent().find('th > a > span').removeClass('fa-sort-asc fa-sort-desc');
                    if(scope.order === scope.by) {
                        scope.reverse = !scope.reverse;
                    } else {
                        scope.by = scope.order ;
                        scope.reverse = false;
                    }
                    scope.sortType = (scope.reverse) ? '-' : '';
                    tableParams = {pageId: null, sortType: scope.sortType+scope.order};
                    scope.svcCall({params:tableParams});
                });
            }
        }
    });
})();



