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
import del from 'del';

const reload = browserSync.reload;
const stream = browserSync.stream;

// Compile scripts
gulp.task('compile:scripts', () => {
  return gulp.src('src/javascripts/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('build/src/javascripts'))
});

// Ensure the compile task is complete before reloading browsers
gulp.task('watch:scripts', ['compile:scripts'], () => {
    browserSync.reload();
});

// JSON
gulp.task('json', () => {
  return gulp.src('src/json/*')
    .pipe(gulp.dest('build/src/json'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Images
gulp.task('images', () => {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/src/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Cards
gulp.task('cards', () => {
  return gulp.src('apps/**/*.png')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Main CSS
gulp.task('styles', () => {
  return gulp.src('src/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifycss())
    .pipe(gulp.dest('build/src/stylesheets'))
    // Live reload after compiling scss
    .pipe(stream({stream: true}));
});

// Themes
gulp.task('themes', () => {
  return gulp.src('apps/themes/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('apps/themes/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('build/themes'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('apps/themes/minified'))
    // Live reload after compiling scss
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

// App misc
gulp.task('misc', () => {
  return gulp.src(['apps/**/*.css', 'apps/**/*.js'])
    .pipe(gulp.dest('build'))
});

// Index
gulp.task('index', () => {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build'))
});

// Clean
gulp.task('clean', () => {
  del.sync(['build', 'apps/themes/css', 'apps/themes/minified'], {read: false})
});

// Build task
gulp.task('build', ['clean', 'compile:scripts', 'json', 'styles', 'images', 'apps', 'cards', 'misc', 'themes', 'index']);

// Watch task
gulp.task('watch', ['build'], () => {
  // Start browserSync
  browserSync.init({
    server: "./build"
  });

  // main .scss files
  gulp.watch('src/stylesheets/*.scss', ['styles']);

  // theme .scss files
  gulp.watch('apps/themes/*.scss', ['themes']);

  // .js files
  gulp.watch('src/javascripts/*.js', ['watch:scripts']);

  // card image files
  gulp.watch('apps/**/*.png', ['cards']);

  // general image files
  gulp.watch('src/images/*', ['images']);

  // json files
  gulp.watch('src/json/*', ['json']);

  // app misc and live reload on change
  gulp.watch(['apps/**/*.css', 'apps/**/*.js'], ['misc']).on('change', reload);

  // app views and live reload on change
  gulp.watch('apps/**/*.html', ['apps']).on('change', reload);

  // index and live reload on change
  gulp.watch('./index.html', ['index']).on('change', reload);
});


// Default task
gulp.task('default', ['watch']);
