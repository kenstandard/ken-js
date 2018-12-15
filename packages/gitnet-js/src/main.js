import properties from "./data/properties.toml";
import dataTypes from "./data/data-types.toml";
import people from "./data/people.toml";
import dex from "./data/dex.toml";
import fhi from "./data/fhi.toml";
import nouns from "./data/nouns.toml";
import tomlFormatter from "./toml-formatter"
import {Database} from "./database"

export default function main(){
    const statements = [
        ...tomlFormatter(properties),
        ...tomlFormatter(nouns),
        ...tomlFormatter(dataTypes),
        ...tomlFormatter(dex),
        ...tomlFormatter(people),
        ...tomlFormatter(fhi)
    ]
    const foo = new Database(statements);
    console.log(foo)
    return foo;
}