const fs = require('fs');

/**
 * Cleans up the compiled components directory.
 */
module.exports = (callback) => {
    // Delete the compiled components directory (it held intermidiately compiled files)
    fs.rmSync('./dist/compiled-components', { recursive: true });

    fs.readdirSync('./dist').forEach(
        (file) => {
            if(file !== 'bundle.js') {
                fs.rmSync(`./dist/${file}`, { recursive: true });
            }
        }
    );
    
    // Call the callback (with no error) indicating to gulp successful completion
    callback();
}