const browserSync = require('browser-sync').create(),
    typescript = require('gulp-typescript'),
    sequence = require('run-sequence'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    gulp = require('gulp');

gulp.task('default', function() {
   sequence('sass', 'dependencies:js', 'dependencies:css', 'javascript', 'html', 'html:inject', 'browserSync:watch', 'browserSync:serve');
})

gulp.task('browserSync:serve', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('browserSync:reload', function() {
    browserSync.reload();
})

gulp.task('browserSync:watch', function() {
  watch('./assets/plugins/**/*.css', function() { sequence('dependencies:css', 'browserSync:reload') });
  watch('./assets/plugins/**/*.js', function() { sequence('dependencies:js', 'browserSync:reload') });
  watch('./assets/javascript/**/*.js', function() { sequence('javascript', 'browserSync:reload') });
  watch('./assets/sass/stylesheet.scss', function() { sequence('sass', 'browserSync:reload') });
  watch('./*.html', function() { sequence('html', 'html:inject', 'browserSync:reload') });
});

gulp.task('sass', function() {
    return gulp.src('./assets/sass/stylesheet.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('javascript', function () {
  return gulp.src('./assets/javascript/**/*.js')
      .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('dependencies:js', function() {
    return gulp.src('./assets/plugins/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('dependencies:css', function() {
    return gulp.src('./assets/plugins/**/*.css')
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('html', function(){
    return gulp.src('./*.html')
    .pipe(gulp.dest('./dist'))
})

gulp.task('html:inject', function() {
    return gulp.src('./dist/*.html')
    .pipe(inject(gulp.src('./dist/assets/**/*.*{js,css}', {read: false}), {relative: true, removeTags: true}))
    .pipe(gulp.dest('./dist'))
})
