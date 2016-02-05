var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var rm = require('gulp-rimraf');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');
var watch = require('gulp-watch');

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['js', 'test', 'compress'], function () {});

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(rm());
});

gulp.task('compress', ['js'], function() {
  return gulp.src('dist/pubsubcutioner.js')
    .pipe(uglify())
    .pipe(concat('pubsubcutioner.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  return gulp.src(['./js/pubsubcutioner.js'])
    .pipe(umd({
      exports: function(file) {
        return 'Pubsubcutioner()';
      },
      namespace: function(file) {
        return 'Pubsubcutioner';
      },
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', ['js'], function() {
  return gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
  gulp.watch('./{test,js}/**/*.js', ['build']);
});

gulp.task('default', ['lint', 'build', 'watch']);
