const Datastore = require('nedb-promise');
const path = require('path');

var repos = new Datastore({
    filename: './db/repos.json',
    autoload: true
});

var logs = new Datastore({
    filename: './db/logs.json',
    autoload: true
});

module.exports = {
    repos: repos,
    logs: logs
};