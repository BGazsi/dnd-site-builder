var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var concat = require('gulp-concat');

var distPath = './dist/css';

// less watcher
gulp.task('watch-less', function() {
    return gulp.watch('./src/less/**/*.less', ['less']);
});

// html watcher
gulp.task('watch-html', function() {
    return gulp.watch('./src/views/**/*.html', ['concat-html']);
});

// Starts watchers
gulp.task('watch', ['watch-less', 'watch-html']);

gulp.task('scripts', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js',
        // './node_modules/tether/dist/js/tether.min.js',
        // './node_modules/bootstrap/js/dist/util.js',
        // './node_modules/bootstrap/js/dist/modal.js',
        // './node_modules/bootstrap/js/dist/dropdown.js',
        // './node_modules/bootstrap/js/dist/tooltip.js',
        // './node_modules/bootstrap/js/dist/popover.js',
        // './node_modules/bootstrap/js/dist/carousel.js',
        // './node_modules/bootstrap/js/dist/collapse.js',
        // './src/js/throttle.js',
        './src/js/script.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// Concat html partials
gulp.task('concat-html', function() {
    gulp.src('./src/views/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/views'));
});

// Compile less
gulp.task('less', function() {
    return gulp.src(['./src/less/style.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task('production', ['less', 'scripts', 'concat-html'], function() {
    return gulp.src(distPath + '/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest(distPath));
});