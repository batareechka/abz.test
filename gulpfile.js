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

const path = {
  styles: {
    watch: './app/assets/stylesheets/**/*',
    input: './app/assets/stylesheets/application.sass',
    output: './dist/stylesheets/'
  },

  scripts: {
    watch: './app/assets/javascripts/**/*',
    input: './app/assets/javascripts/application.js',
    output: './dist/javascripts/'
  },

  html: {
    watch: './app/index.html',
    input: './app/index.html',
    output: './dist/'
  },

  fonts: {
    watch: './app/assets/fonts/**/*',
    input: './app/assets/fonts/**/*',
    output: './dist/fonts/'
  },

  images: {
    watch: './app/assets/images/**/*',
    input: './app/assets/images/**/*',
    output: './dist/images/'
  } 

};


//const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  });

  // browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('styles', function(){
  return gulp.src(path.styles.input)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(autoprefixer())
  // .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.styles.output))
  .pipe(browserSync.stream());
});

gulp.task('scripts', function() {

});

gulp.task('html', function() {
  return gulp.src(path.html.input)
  .pipe(newer('dist'))
  .pipe(gulp.dest(path.html.output))

});

gulp.task('fonts', function() {
  return gulp.src(path.fonts.input)
  .pipe(newer('dist'))
  .pipe(gulp.dest(path.fonts.output));
});

gulp.task('images', function() {
  return gulp.src(path.images.input)
  .pipe(newer('dist'))
  .pipe(gulp.dest(path.images.output));
});

gulp.task('clean', function(done) {
  del.sync('dist');
  done();
});


gulp.task('build', [
  // 'clean',
  'styles',
  'scripts',
  'fonts',
  'images',
  'html']
  );

gulp.task('watch', ['serve'], function() {
  gulp.watch(path.styles.watch, ['styles'] );
  gulp.watch(path.scripts.watch, ['scripts'] );
  gulp.watch(path.html.watch, ['html'] );
});

gulp.task('dev', ['build', 'watch']);

gulp.task('default', function() {
});