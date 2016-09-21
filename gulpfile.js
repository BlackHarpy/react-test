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
        entries: ['src/app.js'],
        cache: {},
        packageCache: {},
        plugin: plugins
    });

    b.on('update', makeBundle);

    function makeBundle () {
      b.transform('babelify', {
              presets: 'react'
          })
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('static/'));
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
