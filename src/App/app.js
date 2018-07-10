var Vue = require('vue/dist/vue.js');
var db = require('./db');
var ctxMenu = require('./ctxmenu');
const fs = require('fs');
const { remote } = require('electron');
const path = require('path');
const _ = require('underscore');

async function init() {
    var repos = await new Promise(function(resolve, reject) {
        db.repos.find({}).sort({name: 1}).exec((e, repos) => {
            if(e) reject(e); resolve(repos);
        });
    });

    Vue.component('modal', {
        template: '#modal-template'
    });

    new Vue({
        el: '#app',
        data: {
            repos,
            showCloneRepoModal: false,
            errorMessage: ""
        },
        components: { contextMenu: ctxMenu.contextMenu },
        methods: {
            onRepoCtxOpen: ctxMenu.show,
            onLeftCtxOpen: ctxMenu.show,
            addRepo() {
                let folderPaths = remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']});
                let nonGitFolderPaths = [];
                let gitFolderPaths = [];

                let hasGitFolderFunc = (folderPath) => {
                    return new Promise((resolve, reject) => {
                        fs.readdir(folderPath, {}, (e, files) => {
                            if(e) reject(e);
                            else resolve(files.includes('.git'));
                        });
                    });
                };
                _.each(folderPaths, async folderPath => {
                    if(await hasGitFolderFunc(folderPath)) {
                        gitFolderPaths.push(folderPath);
                    } else {
                        nonGitFolderPaths.push(folderPath);
                    }
                });

                db.repos.find({ path: { $in: gitFolderPaths } }, async (e, repositories) => {
                    if(e) throw e;

                    let repositoryPaths = _.map(repositories, repository => {
                        return repository.path;
                    });

                    let foldersToAdd = _.chain(gitFolderPaths).filter(gitFolderPath => {
                        return !repositoryPaths.includes(gitFolderPath);
                    }).map(folderToAdd => {
                        return { path: folderToAdd, name: folderToAdd.split(path.sep).pop() }
                    }).value();

                    this.repos = await db.insert(db.repos, foldersToAdd);
                });
            }
        }
    });
}

init();