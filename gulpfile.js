// requirements
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var notify       = require('gulp-notify');

// create sass tasks
gulp.task('sass', function() {
  gulp.src('scss/**/*.scss')
    .pipe(sass())
      .on('error', notify.onError(function (error) {
         return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
      }))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
    .pipe(gulp.dest('css'));
});

// create browser sync task
gulp.task('browser-sync', function() {
  browserSync.init(['css/*.css', 'js/**/*.js', '*.html'], {
    server: {
      baseDir: './'
    }
  });
});

// concat js files
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(concat('paris.min.js'))
    .pipe(gulp.dest('js/min/'));
});

// build assets and start browser-sync server
gulp.task('watch', ['sass', 'browser-sync', 'scripts'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);
});

// default task (build assets)
gulp.task('default', ['sass', 'scripts']);
