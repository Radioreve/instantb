var gulp = require('gulp');
var clearReq = require('clear-require');
var nunjucks = require('gulp-nunjucks');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');

gulp.task('compile-markup', function () {
  var config = require('./config');
  gulp.src(['./templates/*.html', '!./templates/layout.html', '!./templates/knowmore.html', '!./templates/notfound.html'])
    .pipe(nunjucks.compile(config))
    .pipe(gulp.dest(process.cwd()));
});

gulp.task('compile-style', function () {
  var config = require('./config');
  gulp.src(['./templates/*.css'])
    .pipe(nunjucks.compile(config))
    .pipe(gulp.dest(process.cwd() + '/css'));
});

gulp.task('prefix-css', function () {
  gulp.src(['./css/app.css', './css/media.css'])
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest(process.cwd() + '/dist'));
});

gulp.task('clear', function () {
  clearReq('./config');
});

gulp.task('watch', function () {
  gulp.watch(['./templates/*.*', 'config.js', 'Gulpfile.js'], ['compile-markup', 'compile-style', 'prefix-css', 'clear']);
});

gulp.task('default', ['compile-markup', 'compile-style', 'prefix-css', 'clear', 'watch'], function () {
  console.log('Gulp is running...');
});
