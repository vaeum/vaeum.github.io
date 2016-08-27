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

var cp = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

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
    .pipe(browserSync.stream())
)

gulp.task('scss', () =>
  gulp.src(['assets/scss/**/style.scss'])
    .pipe($.sass().on('error', $.notify.onError()))
    .pipe($.postcss(PROCESSORS))
    .pipe($.csso())
    .pipe($.if(!prod, $.postcss([perfectionist({})])))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.stream())
)

gulp.task('font', () =>
  gulp.src(['./assets/bower/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('./assets/fonts/'))
)

gulp.task('jekyll', (done) => {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
})

gulp.task('reload', () =>
    browserSync.reload()
)

gulp.task('serve', () =>
  browserSync({
    open: false,
    server: {
      baseDir: '_site'
    }
  })
)

gulp.task('build', () => runSequence(
  'scss', 'bootstrap', 'font', 'jekyll', 'serve'
))

gulp.task('jekyll-build', () => runSequence(
  'scss', 'bootstrap', 'jekyll', 'reload'
))

gulp.task('default', ['build'], () => {
    $.watch(['assets/scss/**/*.scss'], () => gulp.start('jekyll-build'));
    $.watch(['assets/bootstrap/**/*.scss'], () => gulp.start('jekyll-build'));
    $.watch(['*.html', '_layouts/*.html', '_posts/*'], () => gulp.start('jekyll-build'));
})

