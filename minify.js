var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
gulp.src(['slider.js']).pipe(concat('slider.min.js')).pipe(uglify()).pipe(gulp.dest('./'));