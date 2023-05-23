const stream = require('stream');
const babel = require('@babel/standalone');
const path = require('path');

class JsxTranspilerStream extends stream.Transform {
    constructor(options) {
        super({
            objectMode: true,
            ...options
        });
    }

    _transform(file, encoding, callback) {
        const jsxCode = file._contents;

        const transpiledCode = babel.transform(jsxCode, {
            presets: [
                ['env', { modules: false }],
                'react'
            ]
        }).code;

        file.contents = Buffer.from(transpiledCode);
        if(file.path.includes(path.sep + 'dist' + path.sep)) {
            const beforeDist = file.path.substring(0, file.path.lastIndexOf(path.sep + 'dist'));
            const afterDist = file.path.substring(file.path.lastIndexOf(path.sep + 'dist') + (path.sep + 'dist').length + 1);
            file.path = path.join(beforeDist, afterDist);
        }
        file.path = file.path.substring(0, file.path.lastIndexOf('.')) + '.js';
        
        callback(null, file);
    }
};

module.exports = JsxTranspilerStream;