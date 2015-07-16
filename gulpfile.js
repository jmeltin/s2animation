var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./example",
        injectChanges: false
    });

    gulp.watch("dev/scss/*.scss", ['sass']);
    gulp.watch("src/*.js", ['js']);
    gulp.watch("example/*.html").on('change', browserSync.reload);
    gulp.watch("example/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("dev/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest("example/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("src/*.js")
        .pipe(gulp.dest("example/js"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);