'use strict';
(function() {
    angular.module('tmwServices').factory('httpInterceptorSvc',
        function($q, alertingSvc, $log, authTokenSvc, $location) {
            return {
                request: addToken,
                responseError: response
            };

            function response(response) {
                if(response.status === -1) {
                    $location.path('/login').replace();
                }
                $log.debug('responseError ',response);
                if (response.status === 401) {
                    if(response.data === 'Username or password incorrect') {
                        alertingSvc.addDanger(response.data);
                    } else  {
                        authTokenSvc.removeToken('auth-token');
                        $location.path('/login').replace();
                    }
                }
                if (response.status === 403) {
                    authTokenSvc.removeToken('auth-token');
                    alertingSvc.addDanger('You do not have rights to the requested resource:' + response.data);
                    $location.path('/login').replace();
                } else if (response.status === 404) {
                    alertingSvc.addDanger('End point missing..  ' + response.data.message);
                }
                return $q.reject(response);
            }

            function addToken(config) {
                var token = authTokenSvc.getToken('auth-token');
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer '+ token;
                }
                return config;
            }
        });
})();


