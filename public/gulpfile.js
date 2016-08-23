var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var angularFilesort = require('gulp-angular-filesort');
var paths = {
    src: "./src",
    dist: "./dist"
}

gulp.task('index', function() {
    var jsSources = gulp.src([paths.src + '/**/*.js'])
        .pipe(angularFilesort());
    var cssSources = gulp.src([paths.src + '/**/*.css'], {
        read: false
    });
    gulp.src(paths.src + '/index.html')
        .pipe(wiredep())
        .pipe(inject(jsSources))
        .pipe(inject(cssSources))
        .pipe(gulp.dest(paths.src));
});

gulp.task('dist', ['index', 'copy', 'uglify'], function() {})
gulp.task('copy', function() {
    gulp.src([paths.src + '/**/*.html', '!' + paths.src + '/index.html'], {
            read: false
        })
        .pipe(gulp.dest(paths.dist));
})

gulp.task('uglify', function() {
    gulp.src(paths.src + '/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulpif('*.html', htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(paths.dist));
})
