const path = require('path');
const fs = require('fs');
const stream = require('stream');

class ComponentStream extends stream.Transform {
    /**
     * Creates a new ComponentStream instance
     * 
     * @param {boolean} convertTypescriptPath If true, will convert the path of the file to the compiled version of the file (ex. ui/react/test.tsx -> dist/react/test.js)
     * @param {boolean} includeTest If true, will include test files (ex. test/test-index.jsx)
     * @param  {...any} options TransformStream options
     */
    constructor(convertTypescriptPath, includeTest, ...options) {
        super({
            objectMode: true,
            ...options
        });

        this.convertTypescriptPath = convertTypescriptPath;
        this.includeTest = includeTest;
    }

    _transform(file, encoding, callback) {
        // Get the list of files that are components (defined in the react property of the extension.json file)
        const componentFiles = JSON.parse(fs.readFileSync('extension.json')).react;
        
        // Flag for if we've found the component (because we call the callback but never stop execution)
        let found = false;

        // Loop over the list of component files (gotten earlier)
        componentFiles.forEach(
            (componentFilename) => {
                //console.log(`Does ${file.path} end with ${componentFilename}? ${file.path.endsWith(componentFilename)}`);
                
                // We only want to keep trying to find matches if we havn't found one yet
                // we compare what's in the propery as the end of the file path so that extension authors can specify as relative a path as they want (ex. test.tsx or react/test.tsx or ui/react/test.tsx, etc.)
                if(!found && file.path.endsWith(componentFilename)) {
                    // Because we found a match, we set the found flag to true
                    found = true;

                    // If the file is a Typescript file, and the object flag/property is set, we want to convert the path to the compiled version of the file
                    if(this.convertTypescriptPath && componentFilename.endsWith('.tsx')) {
                        if(file.path.includes(path.sep + 'ui' + path.sep)) {
                            // Get the path portion before the 'ui' folder
                            const pathBeforeUi = file.path.substring(0, file.path.lastIndexOf('ui'));
                            
                            // Get the path portion after the 'ui' folder
                            const pathAfterUi = file.path.substring(file.path.lastIndexOf('ui') + ('ui'.length + path.sep.length));
                            
                            // Change the file's path (to the compiled version of the file)
                            file.path = path.join(pathBeforeUi, 'dist', pathAfterUi.substring(0, pathAfterUi.lastIndexOf('.')) + '.js');
                        }
                        else {
                            // Get the path before the filename
                            const beforeFilename = file.path.substring(0, file.path.lastIndexOf('/'));

                            // Get the filename without the extension
                            const filenameWithoutExtension = file.path.substring(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('.'));
                            
                            // Get the path to the compiled file
                            const compiledFilePath = path.join(beforeFilename, 'dist', filenameWithoutExtension + '.js')
                            
                            // Change the file's path (to the compiled version of the file)
                            file.path = compiledFilePath;
                        }

                        // Reload the file contents (to be the compiled file contents)
                        file._contents = Buffer.from(fs.readFileSync(file.path, encoding ? encoding : 'utf8'));
                    }

                    // Call the callback with the file
                    callback(null, file);
                }
            }
        );
        
        // If the found flag is true, we don't want to call the callback again so return
        // Note, we can't return within the forEach because that would only return from the forEach, not the _transform function
        if(found) {
            return;
        }

        if(this.includeTest && file.path.includes(path.sep + 'test' + path.sep)) {
            callback(null, file);
            return;
        }

        callback(null, null);
    }
}

module.exports = ComponentStream;