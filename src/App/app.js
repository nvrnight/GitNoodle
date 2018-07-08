var Vue = require('vue/dist/vue.js');
var db = require('./db');
var ctxMenu = require('./ctxmenu');

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
            showCloneRepoModal: false
        },
        components: { contextMenu: ctxMenu.contextMenu },
        methods: {
            onRepoCtxOpen: ctxMenu.show,
            onLeftCtxOpen: ctxMenu.show,
            addRepo() {
                console.log(this.$refs.addRepoInput.files);
            }
        }
    });
}

init();