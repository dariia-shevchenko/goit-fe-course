const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const sequence = require('run-sequence');
const htmlmin = require('gulp-htmlmin');
const rigger = require('gulp-rigger');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const babel = require('gulp-babel');

gulp.task('styles', () => {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }]
      })
    )
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp
    .src('app/js/*.js')
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', () => {
  return gulp
    .src('./app/*.html')
    .pipe(rigger())
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch('app/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('app/scss/**/*.scss', ['styles']);
  gulp.watch('app/js/**/*.js', ['scripts']).on('change', browserSync.reload);
});

gulp.task('browserSync', ['styles'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

gulp.task('del:dist', () => del.sync('dist'));

gulp.task('build', callback => {
  sequence('del:dist', 
    ['styles', 'html', 'scripts'],
    callback
  )
});

gulp.task('start', callback => {
  sequence(['build','browserSync', 'watch'],
    callback
  )
});
