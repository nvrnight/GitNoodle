const Application = require('spectron').Application;
const path = require('path');
const fakeDialog = require('spectron-fake-dialog');

var electronPath = path.join(__dirname, '..', 'App', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '../App');

var app = new Application({
    path: electronPath,
    webdriverOptions: {
        deprecationWarnings: false
    },
    args: [appPath, "--storage=inmemory"]
});

fakeDialog.apply(app);

module.exports = app;