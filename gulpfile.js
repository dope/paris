// requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// create sass task
gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'));
});

// create browser sync task
gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css"], {
        server: {
            baseDir: "./"
        }
    });
});

// default task (just run gulp)
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
});