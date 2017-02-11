'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');


//const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  });

  // browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('sass', function(){
  return gulp.src('app/assets/stylesheets/application.sass')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

gulp.task('clean', function(done) {
  del.sync('dist');
  done();
});

gulp.task('copy', function() {
  return gulp.src('app/index.html')
  .pipe(newer('dist'))
  .pipe(debug({title: 'index'}))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'clean',
  'sass',
  'copy']
  );

gulp.task('watch', ['serve'], function() {
  gulp.watch('app/assets/stylesheets/**/*', ['sass'] );
  gulp.watch('app/index.html', ['copy'] );
  debug({title: 'watchDone'});
});

gulp.task('dev', ['build', 'watch']);

gulp.task('default', function() {
});