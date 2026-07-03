'use strict'

import {paths} from '../gulpfile.babel.js'
import gulp from 'gulp'
import include from 'gulp-file-include'
import gulpif from 'gulp-if'
import replace from 'gulp-replace'
import browsersync from 'browser-sync'
import htmlmin from 'gulp-htmlmin'

const production = process.argv.includes('--production')

gulp.task('views', () => {
  return gulp
    .src(paths.views.src)
    .pipe(
      include({
        prefix: '@@',
        basepath: '@file',
      }),
    )
    .pipe(gulpif(production, htmlmin({collapseWhitespace: true})))
    .pipe(gulpif(production, replace('.css', '.min.css')))
    .pipe(gulpif(production, replace('.js', '.min.js')))
    .pipe(gulp.dest(paths.views.dist))
    .pipe(browsersync.stream())
})
