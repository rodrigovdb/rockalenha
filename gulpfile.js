'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    gutil       = require('gulp-util'),
    coffee      = require('gulp-coffee'),
    jade        = require('gulp-jade'),
    browserSync = require('browser-sync'),
    ghPages     = require('gulp-gh-pages'),
    concat      = require('gulp-concat'),
    order       = require('gulp-order'),
    gulpif      = require('gulp-if');

var paths = {
  sass          : './src/sass/*.scss',
  coffee        : './src/coffee/*.coffee',
  jade          : './src/jade/*.jade',

  images        : './src/images/*/*',
  cname         : './src/CNAME',

  jquery        : './bower_components/jquery/dist/jquery.min.js',
}

gulp.task('sass', function(){
    gulp.src([
          paths.sass
        ])
        .pipe(sass({
          includePaths: [
            './bower_components/bourbon/app/assets/stylesheets',
            './bower_components/neat/app/assets/stylesheets',
          ],
          errLogToConsole: true
        }))
        .pipe(gulpif(/\.scss$/, sass({ style: 'compressed' })))
        .pipe(order([
          'src/sass/*.scss'
        ]))
        .pipe(concat('./main.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('coffee', function(){
  gulp.src([
        paths.jquery,
        paths.coffee,
      ])
      .pipe(gulpif(/\.coffee$/, coffee({bare: true})))
      .pipe(order([
        'jquery.min.js',
        'src/coffee/*.coffee'
      ]))
      .pipe(concat('./main.js'))
      .pipe(gulp.dest('./build/js/'))
});

gulp.task('jade', function(){
  var YOUR_LOCALS = {};

  gulp.src(paths.jade)
      .pipe(jade({ client: true }))
      //.pipe(jade({ locals: YOUR_LOCALS }))
      .pipe(gulp.dest('./build/'))
});

gulp.task('images', function () {
  gulp.src(paths.images)
      .pipe(gulp.dest('./build/img'));
});

gulp.task('cname', function () {
  gulp.src(paths.cname)
      .pipe(gulp.dest('./build'));
});

gulp.task('copy', ['images', 'cname']);
gulp.task('compile', ['sass', 'coffee', 'jade']);

gulp.task('server', function () {
  browserSync({
    files   : ['./build/js/*.js', './build/css/*.css', './build/img/*', './build/*.html'],
    server  : { baseDir : './build' }
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.sass,                ['sass']);
  gulp.watch(paths.coffee,              ['coffee']);
  gulp.watch('./src/jade/**/*.jade',    ['jade']);
});

gulp.task('deploy', ['compile', 'copy'], function() {
  return gulp.src([
                './build/*',
                './build/**/*'
              ])
             .pipe(ghPages());
});

gulp.task('default', ['copy', 'compile', 'server', 'watch']);

