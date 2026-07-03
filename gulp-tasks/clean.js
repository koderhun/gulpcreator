'use strict'

import gulp from 'gulp'
import {deleteAsync as del} from 'del'

gulp.task('clean', () => {
  return del(['./dist/*'])
})
