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
    insert: (db, objs) => {
        return new Promise((resolve, reject) => {
            db.insert(objs, (e, o) => {
                if(e)
                    reject(e);
                else
                    resolve(o);
            });
        });
    },
    log: async m => {
        return await insert(logs, { message: m, createdDate: new Date() });
    }
};