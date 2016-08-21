var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var apidoc = require('gulp-apidoc');
var open = require('gulp-open');

gulp.task('default', ['browser-sync'], function() {});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["routes/**/*.*","public/**/*.*","!public/bower_components/**/*.*"],
        browser: "firefox",
        port: 3000,
    });
    gulp.watch("*/**/*.html").on("change", browserSync.reload);
});

gulp.task('nodemon', function(cb) {
    var started = false;
    return nodemon({
        script: 'bin/www'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('doc', function(done) {
    apidoc({
        src: "routes/v1/",
        dest: "docs/"
    }, done);
    gulp.src('docs/index.html')
        .pipe(open());
});
