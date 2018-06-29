var Vue = require('vue/dist/vue.js');
var Datastore = require('nedb-promise');

async function doStuff() {
    var db = new Datastore();
    await db.insert({ type: "todo", text: 'Learn JavaScript' });
    await db.insert({ type: "todo", text: 'Learn Vue' });
    await db.insert({ type: "todo", text: 'Build something awesome' });

    var todos = await db.find({ type: "todo" }, (e,d) => {
        if(e != null) throw e; return d;
    });
    
    new Vue({
        el: '#app',
        data: {
            todos: todos
        }
    });
}

doStuff();