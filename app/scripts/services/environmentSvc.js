'use strict';
(function() {
    angular.module('tmwServices').factory('environmentSvc', function() {
        var environments = [
          {id:'dev',baseUrl: 'http://localhost:8001/api/v1'},
          {id: 'qa',baseUrl: 'http://localhost:8002'},
          {id:'staging',baseUrl: 'http://localhost:8003'},
          {id:'production',baseUrl: 'http://54.236.208.5:8001/api/v1'}
        ];

        return {
            baseUrl: function(env) {
                return _.find(environments, {id:env}).baseUrl;
            }
        };
    });
})();

