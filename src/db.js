const Datastore = require('nedb-promise');
const path = require('path');

var repos = new Datastore({
    filename: './db/repos.json',
    autoload: true
});

module.exports = {
    repos: repos
};