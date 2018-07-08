
const chai = require(`./../chai`);
const app = require(`./../app`);

describe('tester2', () => {
    it('tests the title', async () => {
        await app.start();
        await app.client.waitUntilWindowLoaded().getTitle().should.eventually.equal('Git Noodle');
        await app.stop();
    });
});