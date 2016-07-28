/*eslint-disable*/
var args = require('yargs').argv;
var gulp = require('gulp');
var browserSync = require('browser-sync');
var config =  require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port =  process.env.PORT || config.defaultPort;
var protractor = require("gulp-protractor").protractor;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Run webdrive-manager start and run the protractor test
 */
gulp.task('e2eTest', function() {
  gulp.src([
        "./test/e2e/spec/login.spec.js",
        "./test/e2e/spec/accountList.spec.js",
        "./test/e2e/spec/accountAdd.spec.js",
        "./test/e2e/spec/vehicleList.spec.js",
        "./test/e2e/spec/vehicleAdd.spec.js",
        "./test/e2e/spec/vehicleDetail.spec.js",
        "./test/e2e/spec/faultList.spec.js",
        "./test/e2e/spec/externalInterfaceList.spec.js",
        "./test/e2e/spec/externalInterfaceAdd.spec.js",
        "./test/e2e/spec/externalInterfaceEdit.spec.js",
        "./test/e2e/spec/credentialList.spec.js",
        "./test/e2e/spec/credentialAdd.spec.js",
        "./test/e2e/spec/credentialEdit.spec.js"
      ])
      .pipe(protractor({
        configFile: "./test/e2e/conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function(e) { throw e })
});


/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
  var delconfig = [].concat(config.build, config.temp);
  log('Cleaning: ' + $.util.colors.blue(delconfig));
  del(delconfig, done);
});

gulp.task('less-watcher', function() {
  gulp.watch([config.less], ['styles']);
});


/**
 * Remove all resources from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-resources', function(done) {
  clean(config.build + 'scripts/resources/**/*.*', done);
});

/**
 * Remove all flags from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-flags', function(done) {
  clean(config.build + 'flags/**/*.*', done);
});

/**
 * Remove all flags from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-flags', function(done) {
  clean(config.build + 'flags/**/*.*', done);
});

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
  clean(config.build + 'fonts/**/*.*', done);
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', ['clean-fonts'], function() {
  log('Copying fonts');

  return gulp
      .src(config.fonts)
      .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * Copy flags
 * @return {Stream}
 */
gulp.task('flags', ['clean-flags'], function() {
  log('Copying flags');

  return gulp
      .src(config.flags)
      .pipe(gulp.dest(config.build + 'flags'));
});

/**
 * Copy resources
 * @return {Stream}
 */
gulp.task('resources', ['clean-resources'], function() {
  log('Copying resources');

  return gulp
      .src(config.resources)
      .pipe(gulp.dest(config.build + 'scripts/resources'));
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
  clean(config.build + 'images/**/*.*', done);
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function() {
  log('Compressing and copying images');

  return gulp
      .src(config.images)
      //.pipe($.imagemin({optimizationLevel: 4}))
      .pipe(gulp.dest(config.build + 'images'));
});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function(done) {
  var files = [].concat(
      config.temp + '**/*.js',
      config.build + 'js/**/*.js',
      config.build + '**/*.html'
  );
  clean(files, done);
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', ['clean-code'], function() {
  log('Creating an AngularJS $templateCache');
  console.log(config.htmltemplates);

  return gulp
    .src(config.htmltemplates)
    .pipe($.print())
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp));
});

/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
  var files = [].concat(
      config.temp + '**/*.css',
      config.build + 'styles/**/*.css'
  );
  clean(files, done);
});

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Less --> CSS');

  return gulp
      .src(config.less)
      .pipe($.plumber()) // exit gracefully if something fails after this
      .pipe($.less())
      .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
      .pipe(gulp.dest(config.temp));
});

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function() {
  log('Wiring the bower dependencies into the html');

  var wiredep = require('wiredep').stream;
  var options = config.getWiredepDefaultOptions();

  // Only include stubs if flag is enabled
  //var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;

  return gulp
      .src(config.index)
      .pipe(wiredep(options))
      .pipe($.inject(gulp.src(config.js).pipe($.naturalSort()).pipe($.angularFilesort())))
      .pipe(gulp.dest(config.clientApp));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
  log('Wire up css into the html, after files are ready');

  return gulp
      .src(config.index)
      .pipe($.inject(gulp.src(config.css)))
      .pipe(gulp.dest(config.clientApp));
});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimizeMainLib',['inject', 'fonts', 'images', 'flags', 'resources'], function() {
  log('optimizing the library javascript and library css');
  var assetsLib = $.useref.assets(['']);
  var assetsMain = $.useref.assets({searchPath: './'});
  var templateCache = config.temp + config.templateCache.file;


  return gulp
      .src(config.index)
      .pipe($.plumber())
      .pipe(assetsLib)
      .pipe($.rev())
      .pipe(assetsLib.restore())
      .pipe($.inject(gulp.src(templateCache, {read: false}), {
        starttag: '<!-- inject:templates:js -->'
      }))
      .pipe(assetsMain)
      .pipe($.rev())
      .pipe(assetsMain.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(gulp.dest(config.build));
});

gulp.task('annotate', ['optimizeMainLib'], function () {
  log('annotate javascript');
  var ngAnnotate = require('gulp-ng-annotate');

  return gulp.src('dist/js/app-**.js')
      .pipe(ngAnnotate())
      .pipe(gulp.dest('dist/js'));

});

gulp.task('minAppjs', ['annotate'], function() {
  log('Replace any Environment variables&& minify the main javascript');
  var env = args.env || 'production';

  return gulp.src('dist/js/app-**.js')
      .pipe($.replace(config.localApiStringToReplace, '(\''+env+'\')'))
      //.pipe($.uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('minLibjs', ['minAppjs'], function() {
  log('minify the Lib javascript');

  return gulp.src('dist/js/lib-**.js')
      //.pipe($.uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('mincss', ['minLibjs'], function() {
  log('minify the css files');
  return gulp.src(['dist/styles/app-**.css', 'dist/styles/lib-**.css'])
    .pipe($.cssmin())
    .pipe(gulp.dest('dist/styles'));
});

/**
 * task depreciated -
 * user http-server -p 3000 to debug the dist folder
gulp.task('serve-build', ['build'], function() {
  serve(false);
});
**/

gulp.task('serve', ['inject'], function() {
  serve(true);


});

gulp.task('lint', function () {
  log('linting source code to check for style compliance');
  return gulp.src(config.js)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});


gulp.task('build', function () {
  var runSequence = require('run-sequence');
  runSequence('clean','mincss');
});

gulp.task('test', function(done) {
  startTests(done);


});

function startTests(done) {
  var Server = require('karma').Server;

  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();

  function karmaCompleted (karmaResult) {
    if (karmaResult === 1) {
      done('karma test failed with  code ' + karmaResult);
    } else {
      done();
    }
  }

}

/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 */
function serve(isDev) {
  var nodeOptions = {
    script: config.nodeServer, // give the path to the server app file
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV' : isDev ? 'dev' : 'build'
    },
    watch: [config.server] // define the files to watch to restart on
  };

  return $.nodemon(nodeOptions)
    .on('restart', function(ev) {
      log('** nodemon restarted');
      log('files changed on restart: \n' + ev);
      setTimeout(function() {
        browserSync.notify('reloading now..');
        browserSync.reload({stream: false});

      }, config.browserReloadDelay);

    })
    .on('start', function() {
      log('*** nodemon started');
      startBrowserSync(isDev);

    })
    .on('crash', function() {
      log('*** nodemon crashed. script crashed for some reason');
    })
    .on('exit', function(ev) {
      log('*** nodemon existed cleanly');

    });
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
  if(browserSync.active) {
    return;
  }
  log('starting browser-sync on port ' + port);

  // If build: watches the files, builds, and restarts browser-sync.
  // If dev: watches less, compiles it to css, browser-sync handles reload
  if (isDev) {
    gulp.watch([config.less], ['styles'])
      .on('change', function(event) { changeEvent(event); });
  } else {
    gulp.watch([config.less, config.js, config.appViews, config.moduleViews], ['build', browserSync.reload])
      .on('change', function(event) { changeEvent(event); });
  }
  var options = {
    proxy: 'localhost:'+ port,
    port: 3000,
    files: isDev ? [config.client[0] + '**/*.*', config.client[1] + '**/*.*'] : [],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix:'gulp-patterns',
    notify: true,
    reloadDelay: 1000

  };
  browserSync(options);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}



/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}