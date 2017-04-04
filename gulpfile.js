'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({
    	includePaths : require("bourbon-neat").includePaths.concat(
    					require("bourbon").includePaths)
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});