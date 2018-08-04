
const fakeDialog = require('spectron-fake-dialog');
const chai = require('./../chai');
const app = require('./../app');
const path = require('path');
const fs = require('fs-extra');

describe('remove repository', () => {
    it('works', async () => {
        let tempPath = path.join(process.cwd(), 'tmp');
        if(await !fs.exists(tempPath))
            await fs.mkdir(tempPath);

        let testDirPath = path.join(tempPath, 'removerepo');
        if(await fs.exists(testDirPath)) {
            await fs.remove(testDirPath);
        }

        await fs.mkdir(testDirPath);
        await fs.mkdir(path.join(testDirPath, 'repo1'));
        await fs.mkdir(path.join(testDirPath, 'repo1', '.git'));

        await app.start();
        fakeDialog.mock([ { method: 'showOpenDialog', value: [path.join(testDirPath, 'repo1')] } ]);
        await app.client.waitUntilWindowLoaded();
        await app.client.click('#addRepoButton');
        await app.client.rightClick('.repo');
        await app.client.click('#repoCtxRemove');

        let repos = await app.client.$$('.repo');
        repos.length.should.equal(0);

        (await fs.exists(path.join(testDirPath, 'repo1'))).should.equal(true);

        await app.stop();
    });
});