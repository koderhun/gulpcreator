'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import mincss from 'gulp-clean-css';
import groupmedia from 'gulp-group-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import yargs from 'yargs';
import postcss from 'gulp-postcss';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

const argv = yargs.argv,
  production = !!argv.production;

gulp.task('styles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(groupmedia())
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
    .pipe(browsersync.stream());
});
