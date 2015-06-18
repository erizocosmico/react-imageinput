var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
  browserify({
    entries: 'src/index.jsx',
    extensions: ['.jsx'],
    standalone: 'ImageInput',
    debug: false
  })
    .transform(babelify)
    .bundle()
    .pipe(source('react-imageinput.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('demo', function () {

});

gulp.task('default', ['build']);
