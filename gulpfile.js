var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var fontSpider = require('gulp-font-spider');
var gulpSequence = require('gulp-sequence');
var browserSync = require('browser-sync');
var PATH = {
	scss: 'src/css/tmp/*.scss',
	css: 'src/css/*.css',
	js: 'src/js/tmp/*.js',
	otherjs: 'src/js/tmp/other/*.js'
}
gulp.task('sass', function () {
	return gulp.src(PATH.scss)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['> 1%', 'not ie <= 8']
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('js', function () {
  return gulp.src(PATH.js)
    .pipe(rename('index.min.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('serve', ['sass', 'js', 'js-optimize'], function () {
  browserSync.init({
      server: "./src"
  });
  gulp.watch(PATH.scss, ['sass']);
  gulp.watch(PATH.js, ['js-watch']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});
gulp.task('build', gulpSequence('copy', ['js-optimize', 'css-optimize'])); 
gulp.task('css-optimize', function () {
	return gulp.src(PATH.css)
		.pipe(cleanCss())
    .pipe(gulp.dest('dist/css'));
});
gulp.task('js-optimize', function () {
	return gulp.src(PATH.otherjs)
		.pipe(concat('common.js'))
		.pipe(rename('common.min.js'))
		.pipe(gulp.dest('src/js/other'))
		.pipe(gulp.dest('dist/js/other'));
});
gulp.task('copy', ['clean'], function () {
	return gulp.src(['src/index.html', 'src/image/*', 'src/font/*', 'src/js/*.js', 'src/sound/*', 'src/*.txt'], {base: 'src'}).pipe(gulp.dest('dist'));
});
gulp.task('clean', function () {
	return gulp.src('dist/*').pipe(clean());
})
gulp.task('fontspider', function () {
	return gulp.src('src/index.html').pipe(fontSpider({backup: false}));
})