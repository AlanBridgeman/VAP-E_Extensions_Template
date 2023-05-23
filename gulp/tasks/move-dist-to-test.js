const fs = require('fs');
const path = require('path');

module.exports = (callback) => {
    fs.renameSync('dist', path.join('test', 'dist'));
    
    callback();
}