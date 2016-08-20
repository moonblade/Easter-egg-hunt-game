var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var paths = {
	src: "./src",
	dist: "./dist"
}
function browserSyncInit(baseDir, files) {
    browserSync.instance = browserSync.init(files, {
        startPath: '/',
        server: {
            baseDir: baseDir
        }
    });
}


gulp.task('index', function() {
    return gulp.src('./src/index.html')
        .pipe(wiredep())
        .pipe(inject(gulp.src(['./src/**/*.js', './src/**/*.css'], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest('./src'));
});


gulp.task(
    'serve', ['index'],
    function() {
        browserSyncInit([
            paths.src
        ], [
            paths.src + '/**/*.css',
            paths.src + '/**/*.js',
            paths.src + '/**/*.html'
        ]);
    });

gulp.task('serve:dist', ['build'], function() {
    browserSyncInit(paths.dist);
});
