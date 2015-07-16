var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin       = require('gulp-cssmin'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./_production",
        injectChanges: false
    });

    gulp.watch("_development/scss/*.scss", ['sass']);
    gulp.watch("_development/*.html"     , ['html']);
    gulp.watch("_development/js/*.js"    , ['concatjs']);
});

gulp.task('sass', function() {
    return gulp.src("_development/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest("_production/css"))
        .pipe(browserSync.stream());
});

gulp.task('concatjs', function() {
    return gulp.src("_development/js/*.js")
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest("_production/js"))
        .pipe(browserSync.stream());
});

gulp.task('image', function() {
    return gulp.src("_development/img/*.*")
        .pipe(gulp.dest("_production/img"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src("_development/index.html")
        .pipe(gulp.dest("_production/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve', 'sass', 'html', 'concatjs']);