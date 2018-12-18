const toml = require('toml');
var glob = require("glob")
const concat = require("concat");
const jsonfile = require('jsonfile')
var tomlify = require('tomlify-j0.4');

async function concatTomlGlob(_glob){
    const fileNames = glob.sync(_glob);
    let concatted = await concat(fileNames)
    const data = toml.parse(concatted);
    return data;
}

module.exports = async function (elements, outfile){
    let info = [];
    for (element of elements){
        const item = await concatTomlGlob(element);
        info = [...info, item]
    }
    jsonfile.writeFile(outfile, info, (e) => {if (e) {console.log("Error:",e)}});
}