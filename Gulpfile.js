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
  ts = require('gulp-typescript'),
  browserSync = require('browser-sync'),
  eventStream = require('event-stream'),
  reload = browserSync.reload;

function printError(err) {
  console.log(err.toString());
  this.emit('end');
}

var locations = {
    lesswatch: [
        'src/less/*.less'
    ],
    less: [
        'src/less/lcars.less'
    ],
    fonts: [
        'src/fonts/**'
    ],
    typescript: [
        'src/ts/**/*.ts',
        'typings/**/*.ts'
    ],
    javascript: [
        'src/js/**/*.js'
    ],
    html: [
        '*.html'
    ],
    templates: [
        'src/html/**/*.template'
    ]
};

gulp.task('less', function() {

  return gulp.src(locations.less)
    .pipe(plumber({ errorHandler: printError }))
    .pipe(sourcemaps.init())
    .pipe(less({ style: 'expanded' }))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest('build/css/'))
    //.pipe(minifycss())
    //.pipe(gulp.dest('build/css/'))
    .pipe(reload({stream:true}));

});

gulp.task('copyfonts', function() {
   gulp.src(locations.fonts)
   .pipe(gulp.dest('build/fonts'));
});

var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    removeComments: false,
    module: "amd",
    sortOutput: true
});

gulp.task('ts', function() {
  var tsResult = gulp.src(locations.typescript)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));
    
    return tsResult.js
        .pipe(concat('lcars-scripts.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {

    gulp.src(locations.javascript)
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});

gulp.task('template', function() {

    gulp.src(locations.templates)
        .pipe(concat('lcars-templates.html'))
        .pipe(gulp.dest('build/html'))
        .pipe(reload({stream:true}));
});

gulp.task('html', function() {

  return gulp.src(locations.html)
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

    gulp.watch(locations.lesswatch, ['less']);
    gulp.watch(locations.typescript, ['ts']);
    gulp.watch(locations.javascript, ['js']);
    gulp.watch(locations.fonts, ['copyfonts']);
    gulp.watch(locations.html, ['html']);
    gulp.watch(locations.templates, ['template']);

});

gulp.task('default', ['clean','browser-sync','watch'], function() {

    gulp.start('less', 'ts', 'js', 'copyfonts', 'html', 'template');

});
