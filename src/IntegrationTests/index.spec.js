const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = path.join(__dirname, '..', 'App', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '../App');

var app = new Application({
    path: electronPath,
    args: [appPath, "--storage=inmemory"]
});

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('tester1', function () {
    beforeEach(function () {
        return app.start();
    });
  
    afterEach(function () {
        return app.stop();
    });
  
    it('opens a window', function () {
      return app.client.waitUntilWindowLoaded().getWindowCount().should.eventually.equal(1);
    });
});