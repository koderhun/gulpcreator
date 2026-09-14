'use strict'

import gulp from 'gulp'
import concat from 'gulp-concat'
import babel from 'gulp-babel'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'
import debug from 'gulp-debug'

import {paths} from '../gulpfile.mjs'

const production = process.argv.includes('--production')

gulp.task('scripts', () => {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: !production,
    })
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: [
                  '> 1%',
                  'last 2 versions',
                  'Firefox ESR',
                  'not dead',
                ],
              },
            },
          ],
        ],
      }),
    )
    .pipe(
      gulpif(
        production,
        rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(gulp.dest(paths.scripts.dist, {sourcemaps: '.'}))
    .pipe(
      debug({
        title: 'JS files',
      }),
    )
    .pipe(browserSync.stream())
})
