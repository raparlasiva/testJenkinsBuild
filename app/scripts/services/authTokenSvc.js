'use strict';
(function() {
    angular.module('tmwServices').factory('authTokenSvc', function($window) {
        var store = $window.localStorage;

        return {
            getToken: getToken,
            setToken: setToken,
            removeToken: removeToken
        };

        function getToken(key) {
            return store.getItem(key);
        }

        function setToken(key, token) {
            store.setItem(key, token);
        }

        function removeToken(key) {
            store.removeItem(key);
        }
    });
})();

