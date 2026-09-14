'use strict'

import gulp from 'gulp'

import debug from 'gulp-debug'
import favicons from 'gulp-favicons'
import {paths} from '../gulpfile.mjs'

const faviconConfig = {
  appName: 'My App',
  appShortName: 'App',
  appDescription: 'My application',

  background: '#ffffff',
  theme_color: '#ffffff',

  icons: {
    favicons: true,
    appleIcon: true,

    appleStartup: false,
    android: false,
    windows: false,
    yandex: false,
  },
}

gulp.task('favicons-img', () => {
  return gulp
    .src(paths.favicons.src, {encoding: false}) // ← добавлено
    .pipe(debug({title: 'Favicons'}))
    .pipe(favicons(faviconConfig))
    .pipe(gulp.dest(paths.favicons.dist))
})
