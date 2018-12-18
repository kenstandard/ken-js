var fs = require('fs');
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
// function packageProcessor(glob) {
//     let stage1 = globToStage1(glob);
//     const obj = {name: "sdf"};
//     jsonfile.writeFile("data.json", stage1, (e) => {console.log(e)});
//     return stage1
// }
async function combine(elements){
    let info = [];
    for (element of elements){
        const item = await concatTomlGlob(element);
        info = [...info, item]
    }
    console.log(info); 
    jsonfile.writeFile("data.json", info, (e) => {console.log("Error:",e)});
}

const choo = combine(["src/base/**.toml", "src/fhi/**.toml"])