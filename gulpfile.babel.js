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

const $ = gulpLoadPlugins({});
const cp = require('child_process');
const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const env = {
  messages: {
    jekyllBuild: 'jekyll build'
  },
  watch: {
    jekyll: [
      '*.html',
      '_layouts/*.html',
      '_posts/*',
      '_pages/*',
      '_includes/*',
      'search.json'
    ],
    sass: [
      'assets/scss/**/*.scss'
    ],
    bootstrap: [
      'assets/bootstrap/**/*.scss'
    ]
  }
}

let PROCESSORS = [
  autoprefixer({ browsers: ['last 2 versions', '> 1%'] }),
  mqpacker,
  selector,
  focusHover
]

gulp.task('bootstrap', () =>
  gulp.src(['./assets/bootstrap/**/*.scss'])

    .pipe($.sass({
        includePaths: ['assets/bower/bootstrap-sass/assets/stylesheets/']
    }).on('error', $.notify.onError()))

    .pipe($.postcss(PROCESSORS))
    .pipe($.if(prod, $.csso()))
    .pipe($.if(!prod, $.postcss([perfectionist({})])))
    .pipe(gulp.dest('./_site/assets/css/'))
    .pipe(browserSync.stream())
)

gulp.task('sass', () =>
  gulp.src(['assets/scss/**/style.scss'])
    .pipe($.sass().on('error', $.notify.onError()))
    .pipe($.postcss(PROCESSORS))
    .pipe($.if(prod, $.csso()))
    .pipe($.if(!prod, $.postcss([perfectionist({})])))
    .pipe(gulp.dest('./_site/assets/css/'))
    .pipe(browserSync.stream())
)

gulp.task('jekyll', (done) => {
  browserSync.notify(env.messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
})

gulp.task('reload', () =>
    browserSync.reload()
)

gulp.task('browserSync', () =>
  browserSync({
    open: false,
    server: {
      baseDir: '_site'
    }
  })
)

gulp.task('build:style', () => runSequence(
  'sass', 'bootstrap'
))

gulp.task('build:js', () =>
  gulp.src(['./assets/js/*.*'])
    .pipe($.if(prod, $.uglify()))
    .pipe(gulp.dest('./_site/assets/js/'))
)

gulp.task('build:font', () =>
  gulp.src(['./assets/bower/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('./_site/assets/fonts/'))
)

gulp.task('build:static', () => runSequence(
  'build:style', 'build:font', 'build:js'
))

gulp.task('build', () => runSequence(
  'jekyll', 'build:static', 'browserSync'
))

gulp.task('jekyll-build', () => runSequence(
  'jekyll', 'sass', 'bootstrap', 'build:font', 'build:js', 'reload'
))

gulp.task('default', ['build'], () => {
  $.watch(env.watch.sass, () => gulp.start('sass'));
  $.watch(env.watch.bootstrap, () => gulp.start('bootstrap'));
  $.watch(env.watch.jekyll, () => gulp.start('jekyll-build'));
})

