const fakeDialog = require('spectron-fake-dialog');
const chai = require('./../chai');
const app = require('./../app');
const path = require('path');
const fs = require('fs-extra');

describe('add repository', () => {
    it('works', async () => {
        let tempPath = path.join(process.cwd(), 'tmp');
        if(await !fs.exists(tempPath))
            await fs.mkdir(tempPath);

        let testDirPath = path.join(tempPath, 'addrepo');
        if(await fs.exists(testDirPath)) {
            await fs.remove(testDirPath);
        }

        await fs.mkdir(testDirPath);
        await fs.mkdir(path.join(testDirPath, 'repo1'));
        await fs.mkdir(path.join(testDirPath, 'repo2'));
        await fs.mkdir(path.join(testDirPath, 'repo3'));
        await fs.mkdir(path.join(testDirPath, 'repo1', '.git'));
        await fs.mkdir(path.join(testDirPath, 'repo2', '.git'));

        await app.start();
        fakeDialog.mock([ { method: 'showOpenDialog', value: [path.join(testDirPath, 'repo1'), path.join(testDirPath, 'repo2'), path.join(testDirPath, 'repo3')] } ]);
        await app.client.waitUntilWindowLoaded();
        await app.client.click('#addRepoButton');

        let repos = await app.client.$$('.repo');
        repos.length.should.equal(2);
        await app.stop();
    });
});