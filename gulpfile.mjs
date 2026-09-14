'use strict'

import gulp from 'gulp'

const paths = {
  views: {
    src: './src/views/**/*.html',
    dist: './dist/',
    watch: ['./src/blocks/**/*.html', './src/views/**/*.html'],
  },
  styles: {
    src: './src/styles/app.{scss,sass}',
    dist: './dist/styles/',
    watch: ['./src/blocks/**/*.{scss,sass}', './src/styles/**/*.{scss,sass}'],
  },
  scripts: {
    src: './src/scripts/index.js',
    dist: './dist/scripts/',
    watch: ['./src/blocks/**/*.js', './src/scripts/**/*.js'],
  },
  images: {
    src: [
      './src/images/**/*.{jpg,jpeg,png,gif,tiff,svg}',
      '!./src/images/favicon/*.{jpg,jpeg,png,gif,tiff}',
    ],
    dist: './dist/images/',
    watch: './src/images/**/*.{jpg,jpeg,png,gif,svg,tiff}',
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2}',
    dist: './dist/fonts/',
    watch: './src/fonts/**/*.{woff,woff2}',
  },
  favicons: {
    srcFolder: './src/images/favicon/',
    src: './src/images/favicon/favicon.png',
    dist: './dist/images/favicons/',
    forHtmlPath: './images/favicons/',
    data: './dist/images/favicons/data.json',
  },
  gzip: {
    src: './src/.htaccess',
    dist: './dist/',
  },
  deploy: {
    src: './dist/**/*',
  },
}

export {paths}

import './gulp-tasks/clean.js'
import './gulp-tasks/deploy.js'
import './gulp-tasks/favicons.js'
import './gulp-tasks/fonts.js'
import './gulp-tasks/gzip.js'
import './gulp-tasks/images.js'
import './gulp-tasks/scripts.js'
import './gulp-tasks/serve.js'
import './gulp-tasks/styles.js'
import './gulp-tasks/views.js'
import './gulp-tasks/webp.js'

export const development = gulp.series(
  'clean',
  'views',
  'favicons-img',
  gulp.parallel(['styles', 'scripts', 'images', 'webp', 'fonts']),
  gulp.parallel('serve'),
)

export const prod = gulp.series(
  'clean',
  'views',
  gulp.parallel([
    'styles',
    'scripts',
    'images',
    'webp',
    'fonts',
    'favicons-img',
    'gzip',
  ]),
)

export default development
