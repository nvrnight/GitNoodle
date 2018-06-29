var Vue = require('vue/dist/vue.js');
var db = require('./db');

async function init() {
    new Vue({
        el: '#app',
        data: {
            //repos: await db.repos.find({})
            repos: [
                { name: 'test1', path: '/path1' },
                { name: 'test2', path: '/path2' }
            ]
        }
        
    });
}

init();