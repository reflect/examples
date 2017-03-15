// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create();
    reload = browserSync.reload;
    stream = browserSync.stream;

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/stylesheets'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// Scripts (2 part)
gulp.task('compile:scripts', function() {
  return gulp.src('assets/javascripts/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/javascripts'))
});

// Ensure the compile task is complete before reloading browsers
gulp.task('watch:scripts', ['compile:scripts'], function() {
    browserSync.reload();
});

// Images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Views
gulp.task('views', function() {
  return gulp.src('views/**/*')
    .pipe(gulp.dest('dist/views'))
});

// Index
gulp.task('index', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('dist'))
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

// Build task
gulp.task('build', ['styles', 'compile:scripts', 'images', 'views', 'index']);

// Default task
gulp.task('default', ['clean', 'build']);

// Watch task
gulp.task('watch', ['build'], function() {
  // Start browserSync
  browserSync.init({
    server: "./dist"
  });

  // .scss files
  gulp.watch('assets/stylesheets/*.scss', ['styles']);

  // .js files
  gulp.watch('assets/javascripts/*.js', ['watch:scripts']);

  // image files
  gulp.watch('assets/images/**/*', ['images']);

  // views and live reload on change
  gulp.watch('views/**/*.html', ['views']).on('change', reload);;

  // index and live reload on change
  gulp.watch('./index.html', ['index']).on('change', reload);
});
