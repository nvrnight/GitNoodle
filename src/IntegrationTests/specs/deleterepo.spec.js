
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

        let testDirPath = path.join(tempPath, 'deleterepo');
        if(await fs.exists(testDirPath)) {
            await fs.remove(testDirPath);
        }

        await fs.mkdir(testDirPath);
        let repoPath = path.join(testDirPath, 'repo1');
        await fs.mkdir(repoPath);
        await fs.mkdir(path.join(repoPath, '.git'));

        await app.start();
        await fakeDialog.mock([ { method: 'showOpenDialog', value: [path.join(testDirPath, 'repo1')] } ]);
        await app.client.waitUntilWindowLoaded();
        await app.client.click('#addRepoButton');
        await app.client.rightClick('.repo');
        await app.client.waitForVisible('#repoCtxDelete');
        await app.client.click('#repoCtxDelete');
        await app.client.waitForVisible('#deleteRepoNo');
        await app.client.click('#deleteRepoNo');

        let repos = await app.client.$$('.repo');
        repos.length.should.equal(1);
        (await fs.exists(repoPath)).should.equal(true);

        await app.client.waitUntil(async () => {
            return (await app.client.$$('.modal-mask')).length == 0;
        });
        
        await app.client.rightClick('.repo');
        await app.client.waitForVisible('#repoCtxDelete');
        await app.client.click('#repoCtxDelete');
        await app.client.waitForVisible('#deleteRepoYes');
        await app.client.click('#deleteRepoYes');

        repos = await app.client.$$('.repo');
        repos.length.should.equal(0);
        (await fs.exists(repoPath)).should.equal(false);

        await app.stop();
    });
});