var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

function scripts(watch) {
    var plugins = [];
    if (watch) {
        plugins.push('watchify');
    }
    var b = browserify({
        entries: ['src/App.jsx'],
        cache: {},
        packageCache: {},
        plugin: plugins
    });

    b.on('update', makeBundle);

    function makeBundle() {
        b.transform('babelify', {
                presets: 'react'
            })
            .bundle()
            .on('error', function(err) {
                console.error(err.message);
                console.error(err.codeFrame);
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('static/'));
        console.log('Bundle updated');
    }

    makeBundle();
    return b;
}

gulp.task('bundle', function() {
    return scripts(false);
});

gulp.task('watch', function() {
    return scripts(true);
});

gulp.task('default', ['watch']);
