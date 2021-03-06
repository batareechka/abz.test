'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const include = require("gulp-include");
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const path = {
  styles: {
    watch: './frontend/styles/**/*',
    vendor: './frontend/styles/vendor.css',
    input: './frontend/styles/application.sass',
    output: './dist/stylesheets/'
  },

  scripts: {
    watch: './frontend/javascripts/**/*',
    vendor: './frontend/javascripts/vendor.js',
    input: ['./frontend/javascripts/application.js'],
    output: './dist/javascripts/'
  },

  html: {
    watch: './frontend/views/**/*',
    input: './frontend/views/**/*',
    output: './dist/'
  },

  fonts: {
    watch: './frontend/resources/fonts/**/*',
    input: './frontend/resources/fonts/**/*',
    output: './dist/fonts/'
  },

  images: {
    watch: './frontend/resources/images/**/*',
    input: './frontend/resources/images/**/*',
    output: './dist/images/'
  } 

};

gulp.task('serve', function() {
  // browserSync.init({
  //   server: {
  //     baseDir: 'dist',
  //   }
  // });

  // browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('styles:vendor', function() {
  return gulp.src(path.styles.vendor)
    .pipe(include())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.styles.output))
    .pipe(browserSync.stream());
});

gulp.task('styles:application', function(){
  return gulp.src(path.styles.input)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
  .pipe(autoprefixer())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('../map'))
  .pipe(gulp.dest(path.styles.output))
  .pipe(browserSync.stream());
});

gulp.task('styles', ['styles:vendor', 'styles:application']);

gulp.task('scripts:vendor', function() {
  return gulp.src(path.scripts.vendor)
    .pipe(include()).on('error', console.log)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.scripts.output))
    .pipe(browserSync.stream());
});

gulp.task('scripts:application', function() {
  return gulp.src(path.scripts.input)
  .pipe(sourcemaps.init())
  .pipe(include()).on('error', console.log)
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('../map'))
  .pipe(gulp.dest(path.scripts.output))
  .pipe(browserSync.stream());

});

gulp.task('scripts', ['scripts:vendor', 'scripts:application']);

gulp.task('js', function() {
  return gulp.src(path.scripts.input)
  .pipe(newer('dist'))
  .pipe(gulp.dest(path.scripts.output))

});

gulp.task('html', function() {
  return gulp.src(path.html.input)
  .pipe(newer('dist'))
  // .pipe(htmlmin({collapseWhitespace: true}))
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
  'clean',
  'styles',
  'scripts',
  // 'js',
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

gulp.task('default', ['dev']);