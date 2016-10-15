/**Created by Loki.Luo on 2016/7/25 **/

var gulp = require('gulp'),
    sass = require('gulp-sass');
    sass = require('gulp-watch');
    //pump = require('pump');

gulp.task('sass',function(){
    return gulp.src("app/content/*.scss")
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist'));
});

