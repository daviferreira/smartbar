/*global require*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        //gutil = require('gulp-util'),
        sass = require('gulp-sass'),
        prefix = require('gulp-autoprefixer'),
        minifyCss = require('gulp-minify-css'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify');

    gulp.task('sass', function () {
        return gulp.src('src/sass/*.scss')
                   .pipe(sass())
                   .pipe(gulp.dest('src/css'));
    });

    gulp.task('css', ['sass'], function () {
        gulp.src(['src/css/*.css'])
            .pipe(prefix({cascade: true}))
            .pipe(concat('smartbar.css'))
            .pipe(gulp.dest('dist/css/'))
            .pipe(rename('smartbar.min.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/css/'));
    });

    gulp.task('js', function () {
        gulp.src(['src/js/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('smartbar.js'))
            .pipe(gulp.dest('dist/js/'))
            .pipe(rename('smartbar.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'));
    });

    gulp.task('watch', function () {
        var watcherCSS = gulp.watch('src/sass/**/*.scss', ['css']),
            watcherJS = gulp.watch('src/js/**/*.js', ['js']);
        watcherCSS.on('changed', function (event) {
            console.log('File ' + event.path + ' was ' + event.type +
                        ', running tasks...');
        });
        watcherJS.on('changed', function (event) {
            console.log('File ' + event.path + ' was ' + event.type +
                        ', running tasks...');
        });
    });

    gulp.task('default', ['js', 'css', 'watch']);
}());
