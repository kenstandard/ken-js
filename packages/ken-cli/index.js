#!/usr/bin/env node
'use strict';
const program = require('commander');
const aggregate = require('./aggregate');
var toml = require('toml');
var fs = require('fs');
var watch = require('glob-watcher');

function interpret(input){
    const file = fs.readFileSync(input, 'utf8');
    const _toml = toml.parse(file);
    return _toml;
}

function watcher(config){
    watch(config.imports, (done => {
        aggregate(config.imports, config.output);
        console.log("Imported")
        done();
    }))
}

program
    .command('run', {isDefault: true})
    .alias('r')
    .description('Processes file')
    .option('-w, --watch', 'Watch')
    .action((a, cmd) => {
        const config = interpret(a);
        if (cmd.watch) {
            watcher(config);
        }
        else {
            aggregate(config.imports, config.output)
            console.log("Imported")
        }
    })

program.parse(process.argv)