'use strict';

const prod = (process.env.NODE_ENV == "production")?(true):(false);

import gulp            from 'gulp';
import path            from 'path';
import perfectionist   from 'perfectionist';
import focusHover      from 'postcss-focus-hover';
import browserSync     from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({});
const cp = require('child_process');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const AUTOPREFIXER = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

const env = {
  messages: {
    jekyllBuild: 'jekyll build'
  },
  watch: {
    jekyll: [
      './index.html',
      './search.json',
      './_layouts/**/*.html',
      './_posts/**/*.*',
      './_pages/**/*.*',
      './_includes/**/*.html',
    ],
    sass: [
      '_assets/scss/**/*.scss'
    ],
    svg: [
      '_assets/svg/**/*.svg'
    ],
    js: [
      '_assets/js/**/*.js'
    ]
  },
};

let PROCESSORS = [
  require('autoprefixer')({ browsers: AUTOPREFIXER }),
  require('css-mqpacker')(),
  require('postcss-focus-hover')(),
  require('postcss-custom-selectors')(),
  require('postcss-discard-comments')({ removeAll: true }),
];

const STYLE_SOURCE = [
  './node_modules/bootstrap-only-css/lib/scaffolding.css',
  './node_modules/bootstrap-only-css/lib/utilities.css',
  './node_modules/bootstrap-only-css/lib/normalize.css',
  './node_modules/bootstrap-only-css/lib/type.css',
  './node_modules/bootstrap-only-css/lib/grid.css',
  './node_modules/bootstrap-only-css/lib/responsive-utilities.css',
  '_assets/scss/**/*.scss',
  './node_modules/css.modifiers/dist/modifiers.css'
];

gulp.task('sass', () =>
  gulp.src(STYLE_SOURCE)
    .pipe($.sass().on('error', $.notify.onError()))
    .pipe($.concat('style.css'))
    .pipe($.postcss(PROCESSORS))
    .pipe($.cssPurge())
    .pipe($.if(prod, $.csso()))
    .pipe($.if(!prod, $.postcss([perfectionist({})])))
    .pipe(gulp.dest('./_site/css/'))
    .pipe(browserSync.stream())
);

gulp.task('jekyll', (done) => {
  browserSync.notify(env.messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('reload', (cb) => {
  browserSync.reload();
  return cb();
});

gulp.task('serve', () => {
  browserSync({
    open: false,
    port: 7778,
    server: {
      baseDir: '_site'
    }
  })
});

gulp.task('json:min', () =>
  gulp.src('./_site/search.json')
    .pipe($.jsonminify())
    .pipe(gulp.dest('./_site/'))
);

gulp.task('html:include', () =>
  gulp.src('./_site/**/*.html')
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: './_site'
    }))
    .pipe(gulp.dest('./_site/'))
);

gulp.task('build:svg', () =>
  gulp.src(['./node_modules/octicons/build/svg/*.svg', '_assets/svg/**/*.svg'], {since: gulp.lastRun('build:svg')})
    .pipe($.svgmin((file)=>{
      let prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins:[
          {removeDoctype: true},
          {addClassesToSVGElement: {className: `ico-${prefix}`}},
          {removeTitle: true},
          {removeStyleElement: true},
          {removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] }},
          {removeEmptyContainers: true},
          {sortAttrs: true},
          {removeUselessDefs: true},
          {removeEmptyText: true},
          {removeEditorsNSData: true},
          {removeEmptyAttrs: true},
          {removeHiddenElems: true}
        ]
      }
    }))
    .pipe(gulp.dest('./_includes/svg'))
);

gulp.task('htmlclean', function() {
  return gulp.src('./_site/**/*.html')
    .pipe($.htmlclean())
    .pipe(gulp.dest('./_site'));
});

gulp.task('build:js', () =>
  gulp.src(['./_assets/js/*.*'])
    .pipe($.if(prod, $.uglify()))
    .pipe(gulp.dest('./_site/js/'))
);

gulp.task('build:font', () =>
  gulp.src(['./_assets/bower/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('./_site/assets/fonts/'))
);

gulp.task('build:style', gulp.series(
  'sass'
));

gulp.task('build:static', gulp.series(
  'build:style', 'build:font', 'build:js'
));

gulp.task('build', gulp.series(
  'build:svg', 'jekyll', 'build:static'
));

gulp.task('jekyll-build', gulp.series(
  'build:svg', 'jekyll', 'build:style',
  'build:font', 'build:js', 'reload'
));

gulp.task('watch', () => {
  gulp.watch(env.watch.svg, gulp.series('build:svg'));
  gulp.watch(env.watch.sass, gulp.series('sass'));
  gulp.watch(env.watch.jekyll, gulp.series('jekyll-build'));
  gulp.watch(env.watch.js, gulp.series('build:js', 'reload'));
});

gulp.task('default', gulp.series(
  'build', gulp.parallel('watch', 'serve')
));

