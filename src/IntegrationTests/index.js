const Mocha = require('mocha-parallel-tests').default;
const mocha = new Mocha({
    timeout: 15000
});
mocha.addFile(`${__dirname}/index.spec.js`);
mocha.addFile(`${__dirname}/index2.spec.js`);
mocha.run();