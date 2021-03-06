const Vue = require('vue/dist/vue.js');
const db = require('./db');
const ctxMenu = require('./ctxmenu');
const fs = require('fs-extra');
const { remote } = require('electron');
const path = require('path');
const _ = require('underscore');
const CloneForm = require('./cloneform');

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
            repoToDelete: null,
            errorMessage: ""
        },
        components: { contextMenu: ctxMenu.contextMenu, cloneForm: CloneForm },
        methods: {
            onRepoCtxOpen: ctxMenu.show,
            onLeftCtxOpen: ctxMenu.show,
            async deleteRepo() {
                let repoToDelete = this.repoToDelete;

                if(repoToDelete != null) {
                    if(await fs.exists(repoToDelete.path))
                        await fs.remove(repoToDelete.path);

                    await new Promise((resolve, reject) => {
                        db.repos.remove({ _id: repoToDelete._id }, {}, (e, numRemoved) => {
                            if(e) reject(e); resolve(numRemoved);
                        });
                    });

                    this.repos = this.repos.filter(x => {
                        return x._id != repoToDelete._id;
                    });
                }
                this.repoToDelete = null;
            },
            async removeRepo(repo) {
                await new Promise((resolve, reject) => {
                    db.repos.remove({ _id: repo._id }, {}, (e, numRemoved) => {
                        if(e) reject(e); resolve(numRemoved);
                    });
                });
                
                this.repos = this.repos.filter(x => {
                    return x._id != repo._id;
                });
            },
            async addRepo() {
                let folderPaths = remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']});

                let gitFolderPaths = _.filter(folderPaths, folderPath => {
                    return fs.readdirSync(folderPath).includes('.git');
                });

                let repositories = await new Promise((resolve, reject) => {
                    db.repos.find({ path: { $in: gitFolderPaths } }, async (e, o) => {
                        if(e) reject(e); resolve(o);
                    });
                });
                
                let repositoryPaths = _.map(repositories, repository => {
                    return repository.path;
                });

                let foldersToAdd = _.chain(gitFolderPaths).filter(gitFolderPath => {
                    return !repositoryPaths.includes(gitFolderPath);
                }).map(folderToAdd => {
                    return { path: folderToAdd, name: folderToAdd.split(path.sep).pop() }
                }).value();

                let newRepos = await db.insert(db.repos, foldersToAdd);

                newRepos.forEach(x => {
                    this.repos.push(x);
                });

                this.repos = _.sortBy(this.repos, x => {
                    return x.name;
                });
            }
        }
    });
}

init();