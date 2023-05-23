const gulp = require('gulp');
const ComponentStream = require('../component-stream');
const JsxTranspilerStream = require('../jsx-transpiler-stream');

module.exports =  () => gulp.src(
    [
        '*.js', 
        '*.jsx', 
        '*.ts',
        '*.tsx',
        'ui/**/*.js', 
        'ui/**/*.jsx',
        'ui/**/*.ts',
        'ui/**/*.tsx',
        'test/**/*.js', 
        'test/**/*.jsx'
    ]
)
    .pipe(new ComponentStream(true, true))
    .pipe(new JsxTranspilerStream())
    .pipe(gulp.dest('dist/compiled-components'));