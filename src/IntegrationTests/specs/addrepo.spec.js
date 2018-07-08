const fakeDialog = require('spectron-fake-dialog');
const chai = require(`./../chai`);
const app = require(`./../app`);

describe('window opens', () => {
    it('works', async () => {
        await app.start();
        fakeDialog.mock([ { method: 'showOpenDialog', value: ['C:\\'] } ])
        await app.client.waitUntilWindowLoaded();
        await app.client.click('#addRepoButton');
        await app.stop();
    });
});