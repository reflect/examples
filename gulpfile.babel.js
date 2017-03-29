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
import babel from 'gulp-babel';

const reload = browserSync.reload;
const stream = browserSync.stream;

// Copy base CSS into build folders
gulp.task('copy:base-theme', () => {
  return gulp.src('apps/**/*.css')
    .pipe(gulp.dest('build'))
});

// Compile base CSS for downloadable examples
gulp.task('compile:base-theme', () => {
  return gulp.src(['assets/stylesheets/main.scss', 'apps/themes/reflect-blue.scss'])
    .pipe(concat('base'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/stylesheets'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// Main styles
gulp.task('styles', ['compile:base-theme'], () => {
  return gulp.src('assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/src/stylesheets'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// Themes
gulp.task('themes', ['compile:base-theme'], () => {
  return gulp.src('apps/themes/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/themes'))
    .pipe(gulp.dest('apps/themes/css'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// Compile scripts
gulp.task('compile:scripts', () => {
  return gulp.src('assets/javascripts/*.js')
    .pipe(babel())
    // .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/src/javascripts'))
});

// Ensure the compile task is complete before reloading browsers
gulp.task('watch:scripts', ['compile:scripts'], () => {
    browserSync.reload();
});

// Cards
gulp.task('cards', () => {
  return gulp.src('apps/**/*.png')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/src/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Images
gulp.task('images', () => {
  return gulp.src('assets/images/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/src/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// JSON
gulp.task('json', () => {
  return gulp.src('assets/json/*')
    .pipe(gulp.dest('build/src/json'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// App views
gulp.task('apps', () => {
  return gulp.src('apps/**/*.html')
    .pipe(rename(function(file) {
      file.basename = 'index';
    }))
    .pipe(gulp.dest('build'))
});

// Index
gulp.task('index', () => {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build'))
});

// Clean
gulp.task('clean', () => {
  return gulp.src(['build', 'apps/themes/css'], {read: false})
    .pipe(clean());
});

// Build task
gulp.task('build', ['styles', 'compile:scripts', 'images', 'apps', 'cards', 'json', 'themes', 'copy:base-theme', 'index']);

// Default task
gulp.task('default', ['clean', 'build']);

// Watch task
gulp.task('watch', ['build'], () => {
  // Start browserSync
  browserSync.init({
    server: "./build"
  });

  // main .scss files
  gulp.watch('assets/stylesheets/*.scss', ['styles']);

  // theme .scss files
  gulp.watch('apps/themes/*.scss', ['themes']);

  // base .scss files
  gulp.watch('apps/**/*.css', ['copy:base-theme']);

  // .js files
  gulp.watch('assets/javascripts/*.js', ['watch:scripts']);

  // card image files
  gulp.watch('apps/**/*.png', ['cards']);

  // general image files
  gulp.watch('assets/images/*', ['images']);

  // json files
  gulp.watch('assets/json/*', ['json']);

  // views and live reload on change
  gulp.watch('apps/**/*.html', ['apps']).on('change', reload);;

  // index and live reload on change
  gulp.watch('./index.html', ['index']).on('change', reload);
});
