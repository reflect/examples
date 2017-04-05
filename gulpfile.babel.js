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
import cache from 'gulp-cache';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';
import del from 'del';

const reload = browserSync.reload;
const stream = browserSync.stream;

// Compile scripts
gulp.task('scripts', () => {
  return gulp.src('src/javascripts/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('build/src/javascripts'))
});

// Ensure compiling is complete before reloading
gulp.task('watch:scripts', ['scripts'], () => {
    browserSync.reload();
});

// JSON
gulp.task('json', () => {
  return gulp.src('src/json/*')
    .pipe(gulp.dest('build/src/json'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// General images
gulp.task('images', () => {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/src/images'))
    // Live reload after compiling
    .pipe(stream({stream: true}));
});

// Card images
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
    .pipe(stream({stream: true}))
});

// Index + Favicon
gulp.task('index', () => {
  return gulp.src(['./index.html', './favicon.ico'])
    .pipe(gulp.dest('build'))
});

// App views
gulp.task('views', () => {
  return gulp.src('apps/**/*.html')
    .pipe(rename(function(file) {
      file.basename = 'index';
    }))
    .pipe(gulp.dest('build'))
});

// Ensure compiling is complete before reloading
gulp.task('watch:html', ['index', 'views'], () => {
    browserSync.reload();
});

// App misc
gulp.task('misc', () => {
  return gulp.src(['apps/**/*.css', 'apps/**/*.js'])
    .pipe(gulp.dest('build'))
});

// Ensure compiling is complete before reloading
gulp.task('watch:misc', ['misc'], () => {
    browserSync.reload();
});

// Clean
gulp.task('clean', () => {
  del.sync(['build'], {read: false})
});

// Build task
gulp.task('build', ['clean', 'scripts', 'json', 'styles', 'images', 'views', 'cards', 'misc', 'index']);

// Start browserSync for local server
gulp.task('server', ['build'], () => {
  browserSync.init({
    server: "./build"
  });
})

// Default task
gulp.task('default', ['server']);

// Watch task
gulp.task('watch', ['server'], () => {
  // main scss
  gulp.watch('src/stylesheets/*.scss', ['styles']);

  // js
  gulp.watch('src/javascripts/*.js', ['watch:scripts']);

  // card images
  gulp.watch('apps/*/*.png', ['cards']);

  // general images
  gulp.watch('src/images/*', ['images']);

  // json
  gulp.watch('src/json/*', ['json']);

  // per app misc
  gulp.watch(['apps/*/*.css', 'apps/*/*.js'], ['watch:misc']);

  // views + index
  gulp.watch(['apps/*/*.html', './index.html'], ['watch:html']);
});
