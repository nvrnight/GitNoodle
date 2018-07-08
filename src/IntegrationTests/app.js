const Application = require('spectron').Application;
const path = require('path');

var electronPath = path.join(__dirname, '..', 'App', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '../App');

var app = new Application({
    path: electronPath,
    args: [appPath, "--storage=inmemory"]
});

module.exports = app;