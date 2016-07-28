'use strict';
(function() {
    angular.module('tmwDirectives').directive('autoFocus', function() {
        return {
            link: {
                post: function(scope, element) {
                    element[0].focus();
                }
            }
        };
    });
})();

