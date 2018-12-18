import jsonFormatter from "./json-formatter"
import {Database} from "./database"

export default function main(data){
    const statements = jsonFormatter(data);
    let db = new Database(statements);
    return db;
}