const Datastore = require('nedb');
const path = require('path');
const config = require('./config');

var datastoreConfig = {
    autoload: true
};

var reposConfig = {
    autoload: datastoreConfig.autoload
};

var logsConfig = {
    autoload: datastoreConfig.autoload
};

if(config.storage == "files") {
    reposConfig.filename = './db/repos.json';
    logsConfig.filename = './db/logs.json';
}

var repos = new Datastore(reposConfig);
var logs = new Datastore(logsConfig);

module.exports = {
    repos: repos,
    logs: logs,
    log: async m => {
        logs.insert({ message: m, createdDate: new Date() }, (e, o) => { if(e) throw e; return o; });
    }
};