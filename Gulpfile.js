const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()


gulp.task('sass', _ =>
    gulp.src('src/sass/**/*.s[ac]ss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({
            stream: true,
        }))
)

gulp.task('js', _ =>
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: [ 'es2015' ],
        }))

)
