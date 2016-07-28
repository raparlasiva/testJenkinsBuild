// Karma configuration
// Generated on Sun Aug 09 2015 17:55:14 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //frameworks: ['mocha', 'sinon-chai'],
    frameworks: ['jasmine', 'sinon', 'chai', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-breadcrumb/dist/angular-breadcrumb.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/checklist-model/checklist-model.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'app/scripts/app.js',
      'app/scripts/*.js',
      'app/scripts/filters/*.js',
      'app/scripts/directives/*.js',
      'app/scripts/services/*.js',
      'app/views/*.html',
      'modules/**/*.module.js',
      'modules/**/*.js',
      'test/spec/**/**/*.js',
    ],



    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/scripts/**/*.js': 'coverage',
      'modules/**/*.js': 'coverage',
      'app/views/*.html': ['ng-html2js']

    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
    },

    coverageReporter: {
      dir: 'report/coverage',
      reporters: [
        {type: 'text-summary'}
      ]

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-jasmine',
      'karma-sinon',
      'karma-chai',
      'karma-sinon-chai'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
