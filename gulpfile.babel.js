'use strict';

// Load plugins
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifycss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import cache from 'gulp-cache';
import browserSync from 'browser-sync';

const reload = browserSync.reload;
const stream = browserSync.stream;

// Styles
gulp.task('styles', () => {
  return gulp.src('assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/stylesheets'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// Scripts (2 part)
gulp.task('compile:scripts', () => {
  return gulp.src('assets/javascripts/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/javascripts'))
});

// Ensure the compile task is complete before reloading browsers
gulp.task('watch:scripts', ['compile:scripts'], () => {
    browserSync.reload();
});

// Images
gulp.task('images', () => {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Views
gulp.task('views', () => {
  return gulp.src('views/**/*')
    .pipe(gulp.dest('dist/views'))
});

// Index
gulp.task('index', () => {
  return gulp.src('./index.html')
    .pipe(gulp.dest('dist'))
});

// Clean
gulp.task('clean', () => {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

// Build task
gulp.task('build', ['styles', 'compile:scripts', 'images', 'views', 'index']);

// Default task
gulp.task('default', ['clean', 'build']);

// Watch task
gulp.task('watch', ['build'], () => {
  // Start browserSync
  browserSync.init({
    server: "./dist"
  });

  // .scss files
  gulp.watch('assets/stylesheets/**/*.scss', ['styles']);

  // .js files
  gulp.watch('assets/javascripts/*.js', ['watch:scripts']);

  // image files
  gulp.watch('assets/images/**/*', ['images']);

  // views and live reload on change
  gulp.watch('views/**/*.html', ['views']).on('change', reload);;

  // index and live reload on change
  gulp.watch('./index.html', ['index']).on('change', reload);
});
