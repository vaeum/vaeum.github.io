'use strict';

const prod = (process.env.NODE_ENV == "production")?(true):(false);

import gulp            from 'gulp';
import del             from 'del';
import mainBowerFiles  from 'main-bower-files';
import runSequence     from 'run-sequence';
import perfectionist   from 'perfectionist';
import selector        from 'postcss-custom-selectors';
import focusHover      from 'postcss-focus-hover';
import mqpacker        from "css-mqpacker";
import autoprefixer    from 'autoprefixer';
import browserSync     from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

let $ = gulpLoadPlugins({});

let PROCESSORS = [
  autoprefixer({ browsers: ['last 2 versions', '> 1%'] }),
  mqpacker,
  selector,
  focusHover
]

let BOWER_MAIN_FILES_CONFIG = {
  includeDev: true,
  paths:{
    bowerDirectory: './assets/bower',
    bowerJson: './bower.json'
  }
}

gulp.task('bootstrap', () =>
  gulp.src(['./assets/bootstrap/**/*.scss'])

    .pipe($.sass({
        includePaths: ['assets/bower/bootstrap-sass/assets/stylesheets/']
    }).on('error', $.notify.onError()))

    .pipe($.postcss(PROCESSORS))
    .pipe($.csso())
    .pipe($.if(!prod, $.postcss([perfectionist({})])))
    .pipe(gulp.dest('./assets/css/'))
)

gulp.task('scss', () =>
  gulp.src(['assets/scss/**/style.scss'])
    .pipe($.sass().on('error', $.notify.onError()))
    .pipe($.postcss(PROCESSORS))
    .pipe($.csso())
    .pipe($.if(!prod, $.postcss([perfectionist({})])))
    .pipe(gulp.dest('./assets/css/'))
)

gulp.task('font', () =>
  gulp.src(['./assets/bower/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('./assets/fonts/'))
)

gulp.task('build', () => runSequence(
  'scss', 'bootstrap', 'font'
))

gulp.task('default', ['build'], () => {
    $.watch(['assets/scss/**/*.scss'], () => gulp.start('scss'));
    $.watch(['assets/bootstrap/**/*.scss'], () => gulp.start('bootstrap'));
})

