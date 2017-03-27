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
import babel from 'gulp-babel'

const reload = browserSync.reload;
const stream = browserSync.stream;

// Main styles
gulp.task('styles', () => {
  return gulp.src('assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/stylesheets'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// App themes
gulp.task('themes', () => {
  return gulp.src('apps/themes/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/apps/themes'))
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
    .pipe(gulp.dest('build/javascripts'))
});

// Ensure the compile task is complete before reloading browsers
gulp.task('watch:scripts', ['compile:scripts'], () => {
    browserSync.reload();
});

// Images
gulp.task('images', () => {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// JSON
gulp.task('json', () => {
  return gulp.src('assets/json/**/*')
    .pipe(gulp.dest('build/json'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// App views
gulp.task('apps', () => {
  return gulp.src('apps/**/*')
    .pipe(gulp.dest('build/apps'))
});

// Index
gulp.task('index', () => {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build'))
});

// Clean
gulp.task('clean', () => {
  return gulp.src(['build'], {read: false})
    .pipe(clean());
});

// Build task
gulp.task('build', ['styles', 'compile:scripts', 'images', 'apps', 'json', 'themes', 'index']);

// Default task
gulp.task('default', ['clean', 'build']);

// Watch task
gulp.task('watch', ['build'], () => {
  // Start browserSync
  browserSync.init({
    server: "./build"
  });

  // main .scss files
  gulp.watch('assets/stylesheets/**/*.scss', ['styles']);

  // theme .scss files
  gulp.watch('apps/themes/scss/*.scss', ['themes']);

  // .js files
  gulp.watch('assets/javascripts/*.js', ['watch:scripts']);

  // image files
  gulp.watch('assets/images/**/*', ['images']);

  // image files
  gulp.watch('assets/json/**/*', ['json']);

  // views and live reload on change
  gulp.watch('apps/**/*.html', ['apps']).on('change', reload);;

  // index and live reload on change
  gulp.watch('./index.html', ['index']).on('change', reload);
});
