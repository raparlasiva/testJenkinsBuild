module.exports = function() {
  var environmentVariables = {
    localApiStringToReplace: /\(('dev')\)/i
  };
  var server = './server/';
  var client = ['./app/', './modules/'];

  var clientApp = './app/';
  var moduleApp = './modules/';
  var temp = './.tmp/'

  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };

  var appViews = './app/views/';
  var moduleViews = './modules/**/views/';
  var nodeModules = 'node_modules';

  var config = {
    localApiStringToReplace: environmentVariables.localApiStringToReplace,
    client: client,
    clientApp: clientApp,
    css: temp + 'styles.css',
    defaultPort: 8000,
    build: './dist/',
    fonts: bower.directory + 'font-awesome/fonts/**/*.*',
    flags: bower.directory + 'flag-icon-css/flags/**/*.*',
    resources: clientApp+'scripts/resources/**/*.*',
    htmltemplates: [clientApp + 'views/*.html', moduleApp + '**/views/*.html'],
    images: clientApp + 'images/**/*.*',
    index: clientApp + 'index.html',
    js: [
      clientApp + 'scripts/*.js',
      clientApp + 'scripts/**/*.js',
      moduleApp + '**/*.module.js',
      moduleApp + '**/*.js'

    ],
    less: [clientApp + 'styles/styles.less', clientApp + 'styles/appVariables.less'],
    nodeServer: './server/serverApp.js',
    server: server,
    source: clientApp,
    temp: temp,
    /**
     * template cache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'tmwApp',
        standalone: false,
        transformUrl: function(url) {
          return url.indexOf('views') > -1 ?  url :  'views/'+url;
        }
      }
    },
    /**
     * browser sync
    */
    browserReloadDelay: 1000,

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],
    appViews: appViews + '*.html',
    moduleViews: moduleViews + '*.html'
  };

  /**
   * wiredep and bower settings
   */

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };

    return options;
  }

  return config;
};
