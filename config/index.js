const fs = require('fs');
const yaml = require('js-yaml');

const loadConfig = () => {
    let fileContents = fs.readFileSync('./config/.config.yaml', 'utf8');
    let data = yaml.load(fileContents);
    return data;
}

module.exports = loadConfig;