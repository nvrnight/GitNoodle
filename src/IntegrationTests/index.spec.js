const chai = require('./chai')
var app = require('./app');

describe('tester1', () => {
    it('opens a window', async () => {
        await app.start();
        await app.client.waitUntilWindowLoaded().getWindowCount().should.eventually.equal(1);
        await app.stop();
    });
});