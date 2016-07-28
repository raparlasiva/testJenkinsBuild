'use strict';
(function() {
    angular.module('login.module').factory('loginSvc', function(restResourceSvc) {
        return {
            login: restResourceSvc.restResource('/login/'),
            loginInit: restResourceSvc.restResource('/login')
        };
    });
})();
