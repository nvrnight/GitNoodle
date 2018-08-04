const specsFolder = './specs/';
const path = require('path');
const fs = require('fs');

const Mocha = require('mocha-parallel-tests').default;
var mocha = new Mocha({
    timeout: 60000
});

fs.readdir(specsFolder, (err, files) => {
    files.forEach(file => {
        mocha.addFile(path.join(specsFolder, file));
    });

    mocha.run();
});