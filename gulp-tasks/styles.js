'use strict'

import {paths} from '../gulpfile.mjs'
import gulp from 'gulp'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import mincss from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import browsersync from 'browser-sync'
import debug from 'gulp-debug'
import postcss from 'gulp-postcss'

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

const production = process.argv.includes('--production')

gulp.task('styles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(plumber())
    .pipe(
      sass
        .sync({
          outputStyle: 'expanded',
        })
        .on('error', sass.logError),
    )
    .pipe(postcss())
    .pipe(
      gulpif(
        production,
        mincss({
          compatibility: 'ie8',
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true,
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false,
            },
          },
        }),
      ),
    )
    .pipe(
      gulpif(
        production,
        rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!production, sourcemaps.write('./maps/')))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: 'CSS files',
      }),
    )
    .pipe(browsersync.stream())
})
