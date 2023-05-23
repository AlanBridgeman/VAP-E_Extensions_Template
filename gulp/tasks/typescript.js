const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const ComponentStream = require('../component-stream');

module.exports = () => gulp.src(
    [
        '*.ts', 
        '*.tsx', 
        'ui/**/*.ts', 
        'ui/**/*.tsx'
    ]
)
    .pipe(new ComponentStream(false, false))
    .pipe(tsProject()).js
    .pipe(gulp.dest('dist'))