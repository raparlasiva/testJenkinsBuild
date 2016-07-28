'use strict';
(function() {
    angular.module('tmwDirectives').directive('languageBar', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/languageBar.html',
            controller: function($translate){
                this.changeLang = function(lang){
                    $translate.use(lang);
                }
            },
            controllerAs: 'languageCtrl'
        }
    });
})();
