var Vue = require('vue/dist/vue.js');
var db = require('./db');
var contextMenu = require('vue-context-menu');

async function init() {
    new Vue({
        el: '#app',
        data: {
            //repos: await db.repos.find({})
            repos: [
                { name: 'test1', path: '/path1' },
                { name: 'test2', path: '/path2' }
            ]
        },
        components: { contextMenu },
        methods: {
            onRepoCtxOpen: (e, d) => {
                db.logs.insert(e);
                db.logs.insert(d);
            },
            onLeftCtxOpen: (e, d) => {
                db.logs.insert(e);
                db.logs.insert(d);
            }
        }
    });
}

init();