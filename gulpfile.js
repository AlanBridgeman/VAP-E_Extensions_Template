const gulp = require('./gulp')(['typescript', 'transpile-jsx', 'browserify', 'cleanup', 'transpile-jsx-test', 'browserify-test', 'move-dist-to-test']);

gulp.task('default', gulp.series('typescript', 'transpile-jsx', 'browserify', 'cleanup'));

gulp.task('test', gulp.series('typescript', 'transpile-jsx-test', 'browserify-test', 'move-dist-to-test'));