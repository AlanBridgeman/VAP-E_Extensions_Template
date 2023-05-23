const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const path = require('path');
const fs = require('fs');

module.exports = () => {
    const browserifyOptions = {
        paths: [ path.join('node_modules') ]
    };
    
    // Create a Browserify instance
    const browserifyInstance = browserify(browserifyOptions);
    
    // Get the component files from extnesion.json
    const componentFiles = JSON.parse(fs.readFileSync('extension.json')).react;

    // Add the code file to the Browserify instance (for bundling)
    componentFiles.forEach(
        (componentFilename) => {
            browserifyInstance.add(path.join('dist', 'compiled-components', componentFilename.substring(0, componentFilename.lastIndexOf('.')) + '.js'));
        }
    );

    fs.readdirSync('test').forEach(
        (testFilename) => {
            browserifyInstance.add(path.join('dist', 'compiled-components', testFilename.substring(0, testFilename.lastIndexOf('.')) + '.js'));
        }
    );
    //browserifyInstance.add(path.join('dist', 'compiled-components', 'test-index.js'));
    
    return browserifyInstance
        .transform('babelify', {
            presets: [
                ['@babel/preset-env', { modules: 'auto' }]
            ]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}