#!/usr/bin/env node
'use strict';
const program = require('commander');
const aggregate = require('./aggregate');
var toml = require('toml');
var fs = require('fs');

function interpret(input){
    const file = fs.readFileSync(input, 'utf8');
    const _toml = toml.parse(file);
    return _toml;
}

program
    .command('run', {isDefault: true})
    .alias('r')
    .description('Processes file')
    .action((a) => {
        const config = interpret(a);
        console.log("Config", config)
        aggregate(config.imports, config.output)
        console.log("Completed join")
    })

program.parse(process.argv)