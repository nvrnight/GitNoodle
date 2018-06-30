var contextMenu = require('vue-context-menu');

module.exports = {
    contextMenu: contextMenu,
    show: e => {
        let ctxMenuContainers = document.getElementsByClassName('ctx-menu-container');
        for(let i = 0; i < ctxMenuContainers.length; i++) {
            let container = ctxMenuContainers[i];
            if(container.id != null && container.id != e.id) {
                container.style.display = 'none';
            } else {
                container.style.display = 'block';
            }
        }
    }
}