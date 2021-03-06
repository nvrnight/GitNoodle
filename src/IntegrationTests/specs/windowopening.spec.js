
const chai = require(`./../chai`);
const app = require(`./../app`);

describe('window opens', () => {
    it('works', async () => {
        await app.start();        
        await app.client.waitUntilWindowLoaded();
        await app.client.getTitle().should.eventually.equal('Git Noodle');
        await app.stop();
    });
});