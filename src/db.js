const Datastore = require('nedb');
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
    logs: logs,
    log: async m => {
        logs.insert({ message: m, createdDate: new Date() }, (e, o) => { if(e) throw e; return o; });
    }
};