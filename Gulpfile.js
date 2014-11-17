var gulp = require('gulp'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  stripDebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('less', function() {

  return gulp.src('src/less/lcars.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less({ style: 'expanded' }))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest('build/css/'))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream:true}));

});

gulp.task('js', function() {

  return gulp.src([
    'src/js/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('production.js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream:true}));

});


gulp.task('html', function() {

  return gulp.src([
    '*.html'
    ])
    .pipe(plumber())
    .pipe(reload({stream:true}));

});

gulp.task('clean', function(cb) {

  del(['build/css', 'build/js'], cb)

});

gulp.task('browser-sync', function() {

  browserSync({

	server: {
            baseDir: "./"
        }

  });

});

gulp.task('watch', function() {

  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('*.html', ['html']);

});

gulp.task('default', ['clean','browser-sync','watch'], function() {

  gulp.start('less', 'js');

});
