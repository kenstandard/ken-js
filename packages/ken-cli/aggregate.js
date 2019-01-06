const toml = require('toml');
var glob = require("glob")
const concat = require("concat");
const jsonfile = require('jsonfile')
const fs = require("fs");
var tomlify = require('tomlify-j0.4');

async function concatTomlGlob(_glob){
    const fileNames = glob.sync(_glob);
    const contents = fileNames.map(r => fs.readFileSync(r, 'utf8')).map(toml.parse);
    return contents;
}

module.exports = async function (elements, outfile){
    let info = [];
    for (element of elements){
        const items = await concatTomlGlob(element);
        info = [...info, ...items]
    }
    jsonfile.writeFile(outfile, info,{ spaces: 2, EOL: '\r\n' }, (e) => {if (e) {console.log("Error:",e)}});
}