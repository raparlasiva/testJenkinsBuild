'use strict';
(function() {
  // External dependencies
    angular.module('dependencies', [
        /* Angular modules */
        'ngSanitize',
        /* 3rd-party modules */
        'ngAnimate',
        'ui.bootstrap',
        'ui.router',
        'ncy-angular-breadcrumb',
        'checklist-model',
        'pascalprecht.translate'
    ]);

    angular.module('application', [
        'login.module',
        'layout.module',
        'fault.module',
        'account.module',
        'vehicle.module',
        'credential.module',
        'service.module',
        'externalInterface.module'
    ]);
    angular.module('tmwDirectives', []);
    angular.module('tmwFilters', []);

    angular.module('tmwGlobals', [
        'tmwFilters',
        'tmwServices',
        'tmwDirectives',
        'ngResource'
    ])
    .config(function($httpProvider, $provide) {
        $provide.decorator('$exceptionHandler', function($delegate, $injector) {
            return function(exception, cause) {
                $delegate(exception, cause);
                var alerting = $injector.get('alertingSvc');
                alerting.addDanger(exception.message);
            }
        });

        //On  HTTP provider, it has an array called interceptors.
        // We're going to push on that array just a string that is the name of our interceptor.
        // Angular will look up this interceptor, and every single request that HTTP makes will pass through our
        // function that we defined
        //$httpProvider.interceptors.push('authInterceptorSvc');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('httpInterceptorSvc');
    });

    angular.module('tmwApp', ['dependencies', 'tmwGlobals', 'application'])
    //.constant('DEV_URL', 'http://'+location.hostname)

    .run(function($rootScope, $state, $stateParams, authTokenSvc) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== 'tmw.login' && !authTokenSvc.getToken('auth-token')) {
                event.preventDefault();
                $state.go('tmw.login');
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider, $logProvider, $translateProvider, uibPaginationConfig) {
        uibPaginationConfig.previousText='‹';
        uibPaginationConfig.nextText='›';
        uibPaginationConfig.firstText='«';
        uibPaginationConfig.lastText='»';

        $translateProvider.useStaticFilesLoader({
            prefix: 'scripts/resources/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en_US');

        $translateProvider.useSanitizeValueStrategy(null);

        $logProvider.debugEnabled(true);
        $urlRouterProvider.when('/api/random-user', '/api/random-user');
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('tmw', {
            url: '',
            templateUrl: 'views/main.html',
            abstract:true
        })
    });
})();
