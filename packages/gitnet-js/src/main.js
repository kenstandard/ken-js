import {Timl} from "./core.js";
import config from "./docs.toml";

export default function main(){
    return new Timl(config)
}