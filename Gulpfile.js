/**
 * Created by jcabresos on 3/27/15.
 */
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('merge2');
var del = require('del');
var gulpif = require('gulp-if');
var minimist = require('minimist');

var knownOptions = {
    "boolean": "debug",
    "default": {debug: false}
}

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('clean', function(cb) {
    del(['build', 'bundle'], cb);
})

gulp.task('build', function() {
    var commonjs =
        gulp.src(['src/app/**/*.ts', 'reference.d.ts'])
            .pipe(gulpif(options.debug !== false, sourcemaps.init()))
            .pipe(typescript({
                "module": "commonjs"
            }))

    commonjs.js
        .pipe(gulpif(options.debug !== false, sourcemaps.write()))
        .pipe(gulp.dest('build'))
})

gulp.task('bundle', ['build'], function() {
    var bundler = browserify({
        "entries": ['./build/app.js'],
        "standalone": "app",
        "debug": options.debug !== false
    })

    return merge([
        bundler.bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulpif(options.debug !== true, uglify()))
            .pipe(gulp.dest('bundle/app')),
        gulp.src(['src/**', '!src/app/**'])
            .pipe(gulp.dest('bundle'))
    ])
})

gulp.task('run', ['bundle'], function() {
    gulp.src('bundle')
        .pipe(webserver({
            "livereload": true,
            port: 8000
        }))
})

gulp.task('release', ['build'], function() {
    getBundler().bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('bin-release'))
})


gulp.task('auto', ['bundle'], function() {
    gulp.watch(['src/**'], ['bundle']);
})