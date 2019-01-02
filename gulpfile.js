// modules
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const runSequence = require('run-sequence');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
// config
const ROOT_PATH = path.join(__dirname);
const SRC_DIR = path.join(ROOT_PATH, 'src');
const SRC_LIB_PATH = path.join(SRC_DIR, 'lib');

const DEST_DIR = path.join(ROOT_PATH, 'dist');
const DEST_JS_PATH = path.join(DEST_DIR, 'static/js');
const DEST_VIEW_PATH = path.join(DEST_DIR, 'templates');

const buildSrcArr = function (root, sources) {
    let srcArr = [];
    if (Array.isArray(sources) && sources.length > 0) {
        srcArr = sources.map((item) => {
            return path.join(root, item);
        });
    }
    return srcArr;
}
gulp.task("copy_ie8_lib", function () {
    let srcArr = buildSrcArr(SRC_LIB_PATH, [
        'html5shiv.js',
        'es5-sham.min.js',
        'es5-shim.min.js',
        'raven.min.js'
    ]);
    return gulp.src(srcArr)
        .pipe(gulp.dest(DEST_JS_PATH))
})

// 处理模板文件
gulp.task('build:templates', function () {
    gulp.src(['./templates/**/*.{ejs,html}'])
        .pipe(gulp.dest(DEST_VIEW_PATH));
});
// 打包项目依赖的 Lib 文件
gulp.task('build:lib', function () {
    let srcArr = buildSrcArr(SRC_LIB_PATH, [
        'jquery-1.12.4.js',
        'underscore-min.js',
        'backbone-min.js',
    ]);
    return gulp.src(srcArr).pipe(concat("lib.js"))
        .pipe(gulp.dest(DEST_JS_PATH));
});
gulp.task('build:dll', function (calback) {
    runSequence(
        'clean',
        'build:lib',
        'copy_ie8_lib',
        calback
    );
});
gulp.task('build:app', function (calback) {
    const config = require('./build/webpack.prod.conf');
    webpack(config).run(function (err, stats) {
        if (err) console.error(err);
        console.log(stats.toString());
        calback();
    });
});
gulp.task('build:preview', function (calback) {
    runSequence(
        'build:dll',
        'build:app',
        'build:templates',
        calback
    );
});
gulp.task('build:cdn', function () {

});
gulp.task('clean', function () {
    return del([
        'dist/**/*'
    ]);
});