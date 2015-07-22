// requirements
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');

// create sass tasks
gulp.task('sass', function() {
  return sass('scss/paris.scss', { style: 'compact' })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(plumber())
  .pipe(gulp.dest('css'));
});

// create browser sync task
gulp.task('browser-sync', function() {
  browserSync.init(['css/*.css', 'js/**/*.js', 'index.html'], {
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

// default task (just run gulp)
gulp.task('default', ['sass', 'browser-sync', 'scripts'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);
});
