let config = {
    storage: 'files'
};

let keys = ['storage']

for(var i in process.argv) {
    let arg = process.argv[i];
    if(arg.includes("--")) {
        let argSplit = arg.substring(2).split('=');
        let key = argSplit[0];
        let value = argSplit[1];
        if(keys.includes(key)) {
            config[key] = value;
        }
    }
}

module.exports = config;